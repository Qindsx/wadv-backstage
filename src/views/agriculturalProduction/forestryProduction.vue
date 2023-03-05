<script setup lang="ts">
// import {} from '@/'
import { onMounted, reactive, ref, shallowRef, watch } from "vue";
import type { PaginationProps, LoadingConfig, Align } from "@pureadmin/table";
import {
  getforestryProduction,
  deleteForestryProduction,
  addForestryProduction
} from "@/api/agriculturalProduction";
import { isNumber } from "@vueuse/core";
// import formDrawer from "@/components/form/index.vue";
// import commForm from "@/components/form/commForm.vue"
import { forestryProductionDrawer } from "@/components/drawer";
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

const columns = [
  {
    label: "选择",
    type: "selection",
    prop: "selection",
    align: "left"
  },
  {
    label: "年份",
    prop: "year",
    fixed: true
  },
  {
    label: "荒山沙堤造林面积(亩)",
    prop: "barrenMountain",
    width: "180"
  },
  {
    label: "有林地造林面积(亩)",
    prop: "forestAfforestation",
    width: "180"
  },
  {
    label: "更新改造面积(亩)",
    prop: "reforestationArea",
    width: "180"
  },
  {
    label: "四旁零星植树(亩)",
    prop: "scatteredTreePlanging",
    width: "180"
  },
  {
    label: "森林抚育面积(亩)",
    prop: "forestTendingArea",
    width: "180"
  },
  {
    label: "当年苗木产量(万株)",
    prop: "seedlingYield",
    width: "180"
  },
  {
    label: "育苗面积(亩)",
    prop: "seedlingArea",
    width: "180"
  },
  {
    label: "竹木采伐(万立方米)",
    prop: "bambooTimberHarvesting",
    width: "180"
  },
  {
    label: "木材(万立方米)",
    prop: "timber",
    width: "180"
  },
  {
    label: "竹材(万立方米)",
    prop: "bamboo",
    width: "180"
  },
  {
    label: "楠竹(万立方米)",
    prop: "nanBamboo",
    width: "180"
  },

  {
    label: "杂竹(万立方米)",
    prop: "sundryBamboo",
    width: "180"
  },

  {
    label: "油桐籽(吨)",
    prop: "seedsTungOilTree",
    width: "120"
  },
  {
    label: "油茶籽(吨)",
    prop: "oilTeaCamelliaSeed",
    width: "120"
  },
  {
    label: "乌椿籽(吨)",
    prop: "chineseSapiumSeed",
    width: "120"
  },
  {
    label: "五倍子(吨)",
    prop: "chineseGall",
    width: "120"
  },
  {
    label: "板栗(吨)",
    prop: "chineseChestnut",
    width: "120"
  },
  {
    label: "香菇(吨)",
    prop: "mushroom",
    width: "120"
  },
  {
    label: "白木耳(吨)",
    prop: "whiteFungus",
    width: "120"
  },
  {
    label: "黑木耳(吨)",
    prop: "blackFungus",
    width: "120"
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
  year.value = [];
  year.value.push(yearValue.value);
  console.log(year.value);
  getData();
}
// 重置查询
function resetInfo() {
  year.value = [];
  yearValue.value = "";
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
  const res = await getforestryProduction({
    year: year.value,
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
  formRef.value.open(true, row, "");
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
  const res = await deleteForestryProduction({ year: years });
  if (res.message) {
    ElMessage.success(res.message);
    getData();
  }
}

// 新增数据的年份
const dialogVisible = ref(false);
const addYearValue = ref("");

watch(
  dialogVisible,
  (newQuestion, oldQuestion) => {
    if (!newQuestion) {
      addYearValue.value = "";
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
  formRef.value.open(false, {}, addYearValue.value);
};

// 导出
const exportExcel = async () => {
  const resData = await getforestryProduction({ year: [] });
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
    writeFile(workBook, "林业及林产品生产情况数据报表.xlsx");
    ElMessage.success("导出成功");
  }
};

// 导入
const importList = shallowRef<any>([]);
const beforeUpload: UploadProps["beforeUpload"] = async rawFile => {
  importList.value = await analysisExcel(rawFile, columns, [
    "operate",
    "selection"
  ]);
  console.log(importList.value);
  return true;
};

// 把数据传给服务器后获取最新列表
const handleMany = async () => {
  const list = importList.value.map((item: any, index: number) => {
    return item;
  });
  // console.log(list);
  const res = await addForestryProduction({ data: list });
  if (res.message) {
    ElMessage.success(res.message);
    getData();
  }
};
</script>

<template>
  <div>
    <forestryProductionDrawer
      ref="formRef"
      @done="getData"
    ></forestryProductionDrawer>
    <!-- <formDrawer ref="formRef"></formDrawer> -->
    <!-- <commForm :formOptions="columns" ref="formRef"></commForm> -->
    <!-- <commForm :formOptions="columns" :formData="formData" ref="formRef"></commForm> -->
    <el-card>
      <template #header>
        <div class="card-header flex">
          <el-date-picker
            v-model="yearValue"
            type="year"
            placeholder="请选择年份"
            format="YYYY"
            value-format="YYYY"
          />
          <div class="flex pl-2">
            <el-button class="button" type="info" @click="resetInfo"
              >重置</el-button
            >
            <el-button class="button" type="primary" @click="searchInfo"
              >查询</el-button
            >
          </div>
        </div>
      </template>
      <div class="pb-2 flex">
        <el-button class="button" type="primary" @click="handleAdd">
          新增
        </el-button>
        <el-upload
          class="mx-2"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          accept=".xlsx, .xls"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :http-request="handleMany"
        >
          <el-button class="button" type="primary"> 导入 </el-button>
        </el-upload>
        <!-- <el-link type="primary" class=" text-sm">下载模板</el-link> -->
        <el-link
          type="primary"
          href="/xlsxTemplate/林业及林产品生产情况模板.xlsx"
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
      title="请选择年份"
      width="20%"
      :before-close="handleClose"
    >
      <el-date-picker
        v-model="addYearValue"
        type="year"
        placeholder="请选择年份"
        format="YYYY"
        value-format="YYYY"
      />
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
  </div>
</template>

<style scoped></style>
