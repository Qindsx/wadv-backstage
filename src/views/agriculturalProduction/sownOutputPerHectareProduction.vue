<script setup lang="ts">
// import {} from '@/'
import { onMounted, reactive, ref, shallowRef, watch } from "vue";
import type { PaginationProps, LoadingConfig, Align } from "@pureadmin/table";
import {
  getCropProduction,
  deleteCropProduction,
  addCropProduction
} from "@/api/agriculturalProduction";
import { isNumber } from "@vueuse/core";
// import formDrawer from "@/components/form/index.vue";
// import commForm from "@/components/form/commForm.vue"
import { sownOutputPerHectareProductionDrawer } from "@/components/drawer";
import { utils, writeFile } from "xlsx";
import { ElMessage, ElMessageBox, UploadProps } from "element-plus";
import { analysisExcel } from "@/utils/analysisExcel";
defineOptions({
  name: "grossOutputCompoosition"
});

//  请求数据
onMounted(async () => {
  getData();
});

const CLASSIFY = {
  sown: "播种面积(公顷)",
  output: "总产量(吨)",
  perHectare: "单位面积产量(公斤/公顷)"
};

const classifyValue = ref("");

const classifyOptions = [
  {
    value: "sown",
    label: "播种面积(公顷)"
  },
  {
    value: "output",
    label: "总产量(吨)"
  },
  {
    value: "perHectare",
    label: "单位面积产量(公斤/公顷)"
  }
];

const columns = [
  {
    label: "选择",
    type: "selection",
    prop: "selection",
    align: "left"
  },
  {
    label: "分类",
    prop: "classify",
    slot: "classify",
    fixed: true,
    width: "180"
  },
  {
    label: "年份",
    prop: "year",
    fixed: true
  },
  {
    label: "粮食作物",
    prop: "grainCrops"
  },
  {
    label: "夏收粮食",
    prop: "summerGrainCrops"
  },
  {
    label: "小麦",
    prop: "wheat"
  },
  {
    label: "豆类",
    prop: "soybeanSummer"
  },
  {
    label: "薯类",
    prop: "tuberCropsSummer"
  },
  {
    label: "其他小谷物-夏",
    prop: "otherCerealsSummer"
  },
  {
    label: "早稻",
    prop: "earlySeasonRice"
  },
  {
    label: "秋收粮食",
    prop: "autumnGrainCrops"
  },
  {
    label: "稻谷",
    prop: "paddyRice"
  },
  {
    label: "中稻",
    prop: "midSeasonRice"
  },
  {
    label: "双季晚稻",
    prop: "doubleRotationRice"
  },
  {
    label: "玉米",
    prop: "corn"
  },
  {
    label: "豆类",
    prop: "soybeanAutumn"
  },
  {
    label: "薯类",
    prop: "tuberCropsAutumn"
  },
  {
    label: "其他小谷物-秋",
    prop: "otherCerealsAutumn"
  },
  {
    label: "棉花",
    prop: "cotton"
  },

  {
    label: "油料",
    prop: "oilBerain"
  },
  {
    label: "油菜籽",
    prop: "rapeSeeds"
  },
  {
    label: "花生",
    prop: "peanuts"
  },
  {
    label: "芝麻",
    prop: "sesame"
  },
  {
    label: "麻类",
    prop: "fiberCrops"
  },
  {
    label: "糖料",
    prop: "sugarCrops"
  },
  {
    label: "烟草",
    prop: "tobacco"
  },
  {
    label: "药材",
    prop: "herbCrops"
  },
  {
    label: "蔬菜与瓜果",
    prop: "vagetableMelons"
  },
  {
    label: "蔬菜",
    prop: "vagetable"
  },
  {
    label: "瓜果",
    prop: "melons"
  },
  {
    label: "操作",
    prop: "operate",
    width: "180",
    fixed: "right",
    slot: "operate"
  }
];

// 年份选择
const yearValue = ref("");
const year = ref<string[]>([]);
function searchInfo() {
  if (yearValue.value == "") {
    year.value = [];
  } else {
    year.value.push(yearValue.value);
  }
  console.log(year.value);
  getData();
}
// 重置查询
function resetInfo() {
  year.value = [];
  yearValue.value = "";
  classifyValue.value = "";
  getData();
}

// 分页
const pagination = reactive<PaginationProps>({
  pageSize: 10,
  total: 0,
  currentPage: 1,
  align: "right"
});
// 点击页码事件
function onCurrentChange1(value) {
  if (isNumber(value)) {
    getData(pagination.pageSize, value);
  }
}
// 切换页码事件
function onSizeChange(value, e) {
  pagination.currentPage = 1;
  getData(value, 1);
}

// loading
const loading = ref(false);

// 表格数据及ref
const tableData = ref<any>([]);
const tableRef = ref();

// 请求数据方法
async function getData(size = 10, page = 1) {
  loading.value = true;
  const res = await getCropProduction({
    year: year.value,
    classify: classifyValue.value,
    limit: size,
    offset: size * (page - 1)
  });
  if (res) {
    tableData.value = res.data;
    pagination.total = res.count;
    loading.value = false;
  }
}

// 新增
const handleAdd = () => {
  dialogVisible.value = true;
  console.log(123);
  // formRef.value.open(false, {});
};

// 编辑
const formRef = ref<any>();
function handleEdit(row) {
  console.log(row);
  console.log(formRef.value);
  formRef.value.open(true, row);
}

// 多选事件

const selectionData = ref([]);
const selectionYears = ref([]);
const handleSelectionChange = val => {
  selectionData.value = [];
  selectionYears.value = [];
  val.forEach(item => {
    selectionData.value.push(item);
    selectionYears.value.push(item.year);
  });
  console.log(val);
};

// 删除一个
function handleDelete(year) {
  ElMessageBox.confirm("确定删除该条数据吗?")
    .then(() => {
      deleteData([year]);
    })
    .catch(() => {
      // catch error
    });
  console.log(year);
}

// 删除多个
function handeldeletes() {
  if (selectionYears.value.length == 0) {
    ElMessage.error(" 请选择删除年份");
  } else {
    ElMessageBox.confirm("确定删除选中的数据吗?")
      .then(() => {
        deleteData(selectionYears.value);
        selectionYears.value = [];
      })
      .catch(() => {});
  }
}

// 删除请求
async function deleteData(years: string[]) {
  const res = await deleteCropProduction({ year: years });
  if (res.message) {
    ElMessage.success(res.message);
    getData();
  }
}

// 新增数据的年份
const dialogVisible = ref(false);
const addYearValue = ref("");
const addClassifyValue = ref("");

watch(
  dialogVisible,
  (newQuestion, oldQuestion) => {
    if (!newQuestion) {
      addYearValue.value = "";
      addClassifyValue.value = "";
    }
  },
  {}
);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("确定关闭吗?")
    .then(() => {
      done();
      dialogVisible.value = false;
    })
    .catch(() => {
      // catch error
    });
};

// 选择年份后打开抽屉
const newOpenDrawer = () => {
  dialogVisible.value = false;
  console.log(addYearValue.value);
  formRef.value.open(false, {}, addYearValue.value, addClassifyValue.value);
};

// 导出
const exportExcel = async () => {
  const resData = await getCropProduction({ year: [] });
  if (resData.data) {
    const res = resData.data.map(item => {
      const arr = [];
      columns.forEach(column => {
        if (["operate", "selection"].indexOf(column.prop) == -1) {
          arr.push(item[column.prop as string]);
        }
      });
      return arr;
    });
    const titleList = [];
    columns.forEach(column => {
      if (["operate", "selection"].indexOf(column.prop) == -1) {
        titleList.push(column.label);
      }
    });
    res.unshift(titleList);
    const workSheet = utils.aoa_to_sheet(res);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet);
    writeFile(workBook, "农作物生产情况模板.xlsx");
    ElMessage.success("导出成功");
  }
};

const classifyDialogVisible = ref(false);

watch(
  classifyDialogVisible,
  (newQuestion, oldQuestion) => {
    if (!newQuestion) {
      importClassifyValue.value = "";
    }
  },
  {}
);

// 导入

const newImport = () => {
  classifyDialogVisible.value = true;
};
const importList = shallowRef<any>([]);
const importClassifyValue = ref("");
const beforeUpload: UploadProps["beforeUpload"] = async rawFile => {
  importList.value = await analysisExcel(rawFile, columns, [
    "operate",
    "selection"
  ]);
  importList.value.forEach(item => {
    item.classify = importClassifyValue.value;
  });
  console.log(importList.value);
  return true;
};

// 把数据传给服务器后获取最新列表
const handleMany = async () => {
  const list = importList.value.map((item: any, index: number) => {
    return item;
  });
  // console.log(list);
  const res = await addCropProduction({ data: list });
  if (res.message) {
    ElMessage.success(res.message);
    classifyDialogVisible.value = false;
    getData();
  }
};
</script>

<template>
  <div>
    <sownOutputPerHectareProductionDrawer
      ref="formRef"
      @done="getData"
    ></sownOutputPerHectareProductionDrawer>
    <!-- <formDrawer ref="formRef"></formDrawer> -->
    <!-- <commForm :formOptions="columns" ref="formRef"></commForm> -->
    <!-- <commForm :formOptions="columns" :formData="formData" ref="formRef"></commForm> -->
    <el-card>
      <template #header>
        <div class="card-header flex">
          <div class="ml-2 flex">
            <p class="text-center self-center">年份：</p>
            <el-date-picker
              v-model="yearValue"
              type="year"
              placeholder="请选择年份"
              format="YYYY"
              value-format="YYYY"
            />
          </div>
          <div class="ml-2 flex">
            <p class="text-center self-center">选择类型：</p>

            <el-select
              class="ml-2"
              v-model="classifyValue"
              placeholder="请选择类型"
            >
              <el-option
                v-for="item in classifyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="flex pl-2">
            <el-button class="button" type="info" @click.stop="resetInfo"
              >重置</el-button
            >
            <el-button class="button" type="primary" @click.stop="searchInfo"
              >查询</el-button
            >
          </div>
        </div>
      </template>
      <div class="pb-2 flex">
        <el-button class="button" type="primary" @click="handleAdd">
          新增
        </el-button>
        <!-- <el-upload
          class="mx-2"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          accept=".xlsx, .xls"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :http-request="handleMany"
        >
          <el-button class="button" type="primary"> 导入 </el-button> -->
        <!-- </el-upload> -->
        <el-button type="primary" @click="newImport"> 导入 </el-button>

        <!-- <el-link type="primary" class=" text-sm">下载模板</el-link> -->
        <el-link type="primary" href="/xlsxTemplate/农作物生产情况模板.xlsx"
          >下载模板</el-link
        >
      </div>
      <pure-table
        ref="tableRef"
        height="465"
        alignWhole="center"
        @selection-change="handleSelectionChange"
        v-bind:data="tableData"
        :columns="columns"
        :loading="loading"
        :pagination="pagination"
        @current-change="onCurrentChange1"
        @size-change="onSizeChange"
      >
        <template #classify="scope"> </template>
        <template #operate="scope">
          <el-button
            type="primary"
            size="small"
            @click.stop="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click.stop="handleDelete(scope.row.year)"
          >
            删除
          </el-button>
        </template>
      </pure-table>

      <div style="margin-top: -50px">
        <el-button type="primary" @click="exportExcel">导出</el-button>
        <el-button type="danger" @click="handeldeletes">删除</el-button>
      </div>
    </el-card>
    <!-- 新增数据的年份确认弹框 -->
    <el-dialog
      v-model="dialogVisible"
      title="请选择年份与类型"
      width="35%"
      :before-close="handleClose"
    >
      <div class="flex">
        <div>
          <p class="text-left pb-2">选择年份：</p>
          <el-date-picker
            v-model="addYearValue"
            type="year"
            placeholder="请选择年份"
            format="YYYY"
            value-format="YYYY"
          />
        </div>
        <div class="pl-3">
          <p class="text-left pl-2 pb-2">选择类型：</p>
          <el-select
            class="ml-2"
            v-model="addClassifyValue"
            placeholder="请选择类型"
          >
            <el-option
              v-for="item in classifyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            @click="
              () => {
                handleClose(() => {});
              }
            "
            >取消</el-button
          >
          <el-button type="primary" @click="newOpenDrawer"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 导入类型选择 -->
    <el-dialog
      v-model="classifyDialogVisible"
      title="请选择导入类型"
      width="20%"
      :before-close="handleClose"
    >
      <p class="text-left pl-2 pb-2">选择类型：</p>
      <el-select
        class="ml-2"
        v-model="importClassifyValue"
        placeholder="请选择类型"
      >
        <el-option
          v-for="item in classifyOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <template #footer>
        <span class="dialog-footer flex justify-center">
          {{ importClassifyValue }}
          <el-button
            @click="
              () => {
                handleClose(() => {});
              }
            "
            >取消</el-button
          >

          <el-upload
            class="mx-2"
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="1"
            accept=".xlsx, .xls"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :http-request="handleMany"
            :disabled="importClassifyValue == ''"
          >
            <el-button
              class="button"
              type="primary"
              :disabled="importClassifyValue == ''"
            >
              导入
            </el-button>
          </el-upload>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped></style>
