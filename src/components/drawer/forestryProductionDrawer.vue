<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import commForm from "../form/commForm.vue";
import {
  updeteForestryProduction,
  addForestryProduction
} from "@/api/agriculturalProduction";
import { message } from "@/utils/message";
import { validate } from "@babel/types";

// 表单数据与验证
const formData = ref({
  barrenMountain: "",
  forestAfforestation: "",
  reforestationArea: "",
  scatteredTreePlanging: "",
  forestTendingArea: "",
  seedlingYield: "",
  seedlingArea: "",
  bambooTimberHarvesting: "",
  timber: "",
  bamboo: "",
  nanBamboo: "",
  sundryBamboo: "",
  seedsTungOilTree: "",
  oilTeaCamelliaSeed: "",
  chineseSapiumSeed: "",
  chineseGall: "",
  chineseChestnut: "",
  mushroom: "",
  whiteFungus: "",
  blackFungus: ""
});

const doblueVaildFn = (rule, value, callback) => {
  const reg = /^\d+.?\d{0,2}$/;
  if (!value) {
    callback(new Error("请输入值"));
  } else if (!Number(value)) {
    callback(new Error("请输入数字值"));
  } else {
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("小数点后最多只能输入两位"));
    }
  }
};

const rules = reactive<FormRules>({
  doblueVaild: [{ required: true, validator: doblueVaildFn, trigger: "blur" }],
  intVaild: [
    { required: true, message: "请输入值", trigger: "blur" },
    {
      required: true,
      type: "integer",
      message: "请输入数字值",
      trigger: "blur",
      transform(value) {
        return Number(value);
      }
    }
  ]
});

const formRefD = ref<FormInstance>();

const title = ref("");
const edit = ref(true);
const year = ref("");

const drawer2 = ref(false);
const direction = ref("rtl");
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("确定关闭吗？")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

// 关闭抽屉
function cancelClick() {
  handleClose(() => {
    drawer2.value = false;
  });
}

function beforeClose() {
  console.log("beforeClose");
  cancelClick();
}

watch(
  drawer2,
  (newQuestion, oldQuestion) => {
    if (!newQuestion) {
      formData.value = {
        barrenMountain: "",
        forestAfforestation: "",
        reforestationArea: "",
        scatteredTreePlanging: "",
        forestTendingArea: "",
        seedlingYield: "",
        seedlingArea: "",
        bambooTimberHarvesting: "",
        timber: "",
        bamboo: "",
        nanBamboo: "",
        sundryBamboo: "",
        seedsTungOilTree: "",
        oilTeaCamelliaSeed: "",
        chineseSapiumSeed: "",
        chineseGall: "",
        chineseChestnut: "",
        mushroom: "",
        whiteFungus: "",
        blackFungus: ""
      };
      // formRefD.value.resetFields();
    }
  },
  {}
);

// 确认提交
function confirmClick() {
  formRefD.value.validate(valid => {
    if (valid) {
      ElMessageBox.confirm(`确定提交吗?`)
        .then(() => {
          if (edit.value) {
            updeteForm();
          } else {
            addForm();
          }
        })
        .catch(() => {
          // catch error
        });
    } else {
      return false;
    }
  });
}

// 发送修改请求
async function updeteForm() {
  const res = await updeteForestryProduction({
    data: { ...formData.value },
    year: year.value
  });
  if (res.message) {
    emit("done");
    drawer2.value = false;
    ElMessage.success(res.message);
  }
}

// 发送新增请求
async function addForm() {
  const res = await addForestryProduction({
    data: [{ ...formData.value, year: year.value }]
  });
  if (res.message) {
    emit("done");
    drawer2.value = false;
    ElMessage.success(res.message);
  }
}

// 抽屉初始值
const open = (isEdit: boolean, row, newYear: string) => {
  console.log(row);
  if (isEdit) {
    edit.value = isEdit;
    year.value = row.year;
    title.value = `编辑${row.year}年林业及林产品生产情况`;
    for (let i in formData.value) {
      if (row.hasOwnProperty(i)) formData.value[i] = row[i];
    }
  } else {
    edit.value = isEdit;
    console.log(isEdit);
    year.value = newYear;
    title.value = `添加${newYear}年林业及林产品生产情况`;
  }
  drawer2.value = true;
};

defineExpose({
  drawer2,
  open
});
const emit = defineEmits(["done"]);
</script>

<template>
  <div>
    <el-drawer
      size="45%"
      v-model="drawer2"
      direction="rtl"
      :before-close="beforeClose"
    >
      <template #header>
        <h4>{{ title }}</h4>
      </template>
      <template #default>
        <el-form
          :inline="true"
          :model="formData"
          ref="formRefD"
          label-position="top"
          class="demo-form-inline"
        >
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="荒山沙堤造林面积(亩)"
              prop="barrenMountain"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.barrenMountain"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="有林地造林面积(亩)"
              prop="forestAfforestation"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.forestAfforestation"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="更新改造面积(亩)"
              prop="reforestationArea"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.reforestationArea"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="四旁零星植树(亩)"
              prop="scatteredTreePlanging"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.scatteredTreePlanging"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="森林抚育面积(亩)"
              prop="forestTendingArea"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.forestTendingArea"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="当年苗木产量(万株)"
              prop="seedlingYield"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.seedlingYield" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="育苗面积(亩)"
              prop="seedlingArea"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.seedlingArea" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="竹木采伐(万立方米)"
              prop="bambooTimberHarvesting"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.bambooTimberHarvesting"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="木材(万立方米)"
              prop="timber"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.timber" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="竹材(万立方米)"
              prop="bamboo"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.bamboo" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="楠竹(万立方米)"
              prop="nanBamboo"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.nanBamboo" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="杂竹(万立方米)"
              prop="sundryBamboo"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.sundryBamboo" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="油桐籽(吨)"
              prop="seedsTungOilTree"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.seedsTungOilTree"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="油茶籽(吨)"
              prop="oilTeaCamelliaSeed"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.oilTeaCamelliaSeed"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="乌椿籽(吨)"
              prop="chineseSapiumSeed"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.chineseSapiumSeed"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="五倍子(吨)"
              prop="chineseGall"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.chineseGall" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="板栗(吨)"
              prop="chineseChestnut"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.chineseChestnut"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="香菇(吨)"
              prop="mushroom"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.mushroom" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="白木耳(吨)"
              prop="whiteFungus"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.whiteFungus" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="黑木耳(吨)"
              prop="blackFungus"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.blackFungus" placeholder="请输入" />
            </el-form-item>
          </div>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">提交</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<style scoped></style>
