<script setup lang="ts">
// import {} from '@/'
import { onMounted, reactive, ref, shallowRef, watch } from "vue";
import type { PaginationProps, LoadingConfig, Align } from "@pureadmin/table";
import {
  getOtherProductionSituation,
  deleteOtherProductionSituation,
  addOtherProductionSituation
} from "@/api/agriculturalProduction";
import { isNumber } from "@vueuse/core";
import { productionOfOtherProductsDrawer } from "@/components/drawer";
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
    label: "年末大牲畜存栏(头)",
    prop: "yearendStockAnimals",
    width: "120"
  },
  {
    label: "良种及改良种乳牛(头)",
    prop: "cowsBreed",
    width: "120"
  },
  {
    label: "肉用牛(头)",
    prop: "beefCattle",
    width: "120"
  },
  {
    label: "马(头)",
    prop: "horses",
    width: "80"
  },
  {
    label: "驴(头)",
    prop: "donkeys",
    width: "80"
  },
  {
    label: "骡(头)",
    prop: "mutes",
    width: "120"
  },
  {
    label: "年末羊只数(头)",
    prop: "yearendSheep",
    width: "120"
  },
  {
    label: "年末牲猪存栏(万头)",
    prop: "yearendHogs",
    width: "120"
  },
  {
    label: "能繁母猪(万头)",
    prop: "femalHogs",
    width: "120"
  },
  {
    label: "全年肉猪出栏(万头/吨)",
    prop: "slaughteredFattenedHogs",
    width: "160"
  },
  {
    label: "全年出售和自宰肉用牛(头/吨)",
    prop: "slaughteredCattle",
    width: "160"
  },
  {
    label: "自宰肉羊(只/吨)",
    prop: "slaughteredSheep",
    width: "120"
  },
  {
    label: "自宰家禽(万只/吨)",
    prop: "slaughteredPoultry",
    width: "120"
  },
  {
    label: "牛奶产量(吨)",
    prop: "milk",
    width: "120"
  },
  {
    label: "蜂蜜(吨)",
    prop: "honey",
    width: "120"
  },
  {
    label: "禽蛋产量(吨)",
    prop: "eggs",
    width: "120"
  },
  {
    label: "茶叶总产量(吨)",
    prop: "teaOutputAll",
    width: "120"
  },
  {
    label: "绿茶(吨)",
    prop: "greenTea",
    width: "120"
  },
  {
    label: "清茶(吨)",
    prop: "wulongTea",
    width: "120"
  },
  {
    label: "白茶(吨)",
    prop: "whiteTea",
    width: "120"
  },
  {
    label: "其他茶(吨)",
    prop: "otherTea",
    width: "120"
  },
  {
    label: "年末茶园面积(公顷)",
    prop: "teaPlantationArea",
    width: "120"
  },
  {
    label: "采摘面积(公顷)",
    prop: "pickedArea",
    width: "120"
  },
  {
    label: "水果产量(吨)",
    prop: "fruitOutputAll",
    width: "120"
  },
  {
    label: "桃子(吨)",
    prop: "peaches",
    width: "120"
  },
  {
    label: "柑橘(吨)",
    prop: "citrus",
    width: "120"
  },
  {
    label: "梨子(吨)",
    prop: "pears",
    width: "120"
  },
  {
    label: "葡萄(吨)",
    prop: "grapes",
    width: "120"
  },
  {
    label: "柿子(吨)",
    prop: "persimmons",
    width: "120"
  },
  {
    label: "猕猴桃(吨)",
    prop: "kiwiFruit",
    width: "120"
  },
  {
    label: "年末果园面积(公顷)",
    prop: "yearendOrchardArea",
    width: "120"
  },
  {
    label: "柑橘园面积(公顷)",
    prop: "citrusArea",
    width: "120"
  },
  {
    label: "梨园面积(公顷)",
    prop: "pearsArea",
    width: "120"
  },
  {
    label: "葡萄园面积(公顷)",
    prop: "grapesArea",
    width: "120"
  },
  {
    label: "桃园面积(公顷)",
    prop: "peachsArea",
    width: "120"
  },
  {
    label: "猕猴桃面积(公顷)",
    prop: "kiwiArea",
    width: "120"
  },
  {
    label: "水产产量(吨)",
    prop: "aquaticProducts",
    width: "120"
  },
  {
    label: "淡水捕捞产量(吨)",
    prop: "fishCaughtAll",
    width: "120"
  },
  {
    label: "鱼类捕捞(吨)",
    prop: "fishCaught",
    width: "120"
  },
  {
    label: "虾蟹类捕捞(吨)",
    prop: "shrimpsCaught",
    width: "120"
  },
  {
    label: "贝类捕捞(吨)",
    prop: "shellfhshCaught",
    width: "120"
  },
  {
    label: "其他类捕捞(吨)",
    prop: "otherCaught",
    width: "120"
  },
  {
    label: "淡水养殖产量(吨)",
    prop: "fishArtificiallyAll",
    width: "120"
  },
  {
    label: "鱼类养殖(吨)",
    prop: "fishArtificially",
    width: "120"
  },
  {
    label: "贝类养殖(吨)",
    prop: "shellfhshArtificially",
    width: "120"
  },
  {
    label: "虾蟹养殖(吨)",
    prop: "shrimpsArtificially",
    width: "120"
  },
  {
    label: "其他类养殖(吨)",
    prop: "otherArtificially",
    width: "120"
  },
  {
    label: "增值养殖产量(吨)",
    prop: "fishCulturedAll",
    width: "120"
  },
  {
    label: "鱼类增殖(吨)",
    prop: "fishCultured",
    width: "120"
  },
  {
    label: "贝类增值(吨)",
    prop: "shellfhshCultured",
    width: "120"
  },
  {
    label: "其他增值类(吨)",
    prop: "otherCultured",
    width: "120"
  },
  {
    label: "淡水养殖面积(公顷)",
    prop: "freshCulturedArea",
    width: "120"
  },
  {
    label: "稻田养殖面积(公顷)",
    prop: "paddyCulturedArea",
    width: "120"
  },
  {
    label: "增值养殖面积(公顷)",
    prop: "proliferationArtificiallyArea",
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
  const res = await getOtherProductionSituation({
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
  const res = await deleteOtherProductionSituation({ year: years });
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
  const resData = await getOtherProductionSituation({ year: [] });
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
    writeFile(workBook, "牧渔、茶叶和水果生产情况模板 .xlsx");
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
  const res = await addOtherProductionSituation({ data: list });
  if (res.message) {
    ElMessage.success(res.message);
    getData();
  }
};
</script>

<template>
  <div>
    <productionOfOtherProductsDrawer
      ref="formRef"
      @done="getData"
    ></productionOfOtherProductsDrawer>
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
          href="/xlsxTemplate/牧渔、茶叶和水果生产情况模板.xlsx"
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
