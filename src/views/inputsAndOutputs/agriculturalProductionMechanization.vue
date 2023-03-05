<script setup lang="ts">
// import {} from '@/'
import { onMounted, reactive, ref, shallowRef, watch } from "vue";
import type { PaginationProps, LoadingConfig, Align } from "@pureadmin/table";
import {
  getProductionConditionsAndInputs,
  deleteProductionConditionsAndInputs,
  addProductionConditionsAndInputs
} from "@/api/inputsAndOutputs";
import { isNumber } from "@vueuse/core";
// import formDrawer from "@/components/form/index.vue";
// import commForm from "@/components/form/commForm.vue"
import { agriculturalProductionMechanizationDrawer } from "@/components/drawer";
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
    label: "有效灌溉面积(千公顷)",
    prop: "effectiveIrrigationArea",
    width: "220"
  },
  {
    label: "旱涝保收面积(千公顷)",
    prop: "floodDroughtArea",
    width: "220"
  },
  {
    label: "机电排灌面积(千公顷)",
    prop: "pumpedIrrigationArea",
    width: "220"
  },
  {
    label: "农村用电量(万千瓦小时)",
    prop: "electricityRuralArea",
    width: "220"
  },
  {
    label: "农用化肥施用量-氮肥(吨)",
    prop: "nitrogenousFertilizer",
    width: "220"
  },
  {
    label: "农用化肥施用量-磷肥(吨)",
    prop: "phosphateFertilizer",
    width: "220"
  },
  {
    label: "农用化肥施用量-钾肥(吨)",
    prop: "potashFertilizer",
    width: "220"
  },
  {
    label: "农用化肥施用量-复合肥(吨)",
    prop: "compoundFertilizer",
    width: "220"
  },
  {
    label: "农用塑料薄膜使用量-地膜(吨)",
    prop: "mulchFilm",
    width: "220"
  },
  {
    label: "农用塑料薄膜使用量-地膜覆盖面积(千公顷)",
    prop: "mulchFilmArea",
    width: "320"
  },
  {
    label: "农用柴油(吨)",
    prop: "agriculturalDieselOil",
    width: "220"
  },
  {
    label: "农药使用量(吨)",
    prop: "comsumptionPesticide",
    width: "220"
  },
  {
    label: "柴油发动机动力(万千瓦)",
    prop: "dieselEngines",
    width: "220"
  },
  {
    label: "汽油发动机动力(万千瓦)",
    prop: "gasolineEngines",
    width: "220"
  },
  {
    label: "大中型拖拉机(台)",
    prop: "largeTractors",
    width: "220"
  },
  {
    label: "大中型拖拉机-动力(万千瓦)",
    prop: "largePower",
    width: "220"
  },
  {
    label: "小型及扶手拖拉机(台)",
    prop: "miniTractors",
    width: "220"
  },
  {
    label: "小型及扶手拖拉机-动力(万千瓦)",
    prop: "miniPowers",
    width: "220"
  },
  {
    label: "大中型拖拉机配套农具(部)",
    prop: "largeMachinery",
    width: "220"
  },
  {
    label: "小型拖拉机配套农具(部)",
    prop: "miniMachinery",
    width: "220"
  },
  {
    label: "农用水泵(台)",
    prop: "pumps",
    width: "140"
  },
  {
    label: "联合收割机(台)",
    prop: "combine",
    width: "140"
  },
  {
    label: "联合收割机-动力(千瓦)",
    prop: "combinePower",
    width: "220"
  },
  {
    label: "机动脱粒机(台)",
    prop: "motorizedThresher",
    width: "220"
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
  const res = await getProductionConditionsAndInputs({
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
  const res = await deleteProductionConditionsAndInputs({ year: years });
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
  const resData = await getProductionConditionsAndInputs({ year: [] });
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
    writeFile(workBook, "农业生产投入情况数据报表.xlsx");
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
  const res = await addProductionConditionsAndInputs({ data: list });
  if (res.message) {
    ElMessage.success(res.message);
    getData();
  }
};
</script>

<template>
  <div>
    <agriculturalProductionMechanizationDrawer
      ref="formRef"
      @done="getData"
    ></agriculturalProductionMechanizationDrawer>
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
        <el-link type="primary" href="/xlsxTemplate/农业生产投入情况模板.xlsx"
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
