<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import commForm from "../form/commForm.vue";
import {
  updeteProductionConditionsAndInputs,
  addProductionConditionsAndInputs
} from "@/api/inputsAndOutputs";
import { message } from "@/utils/message";
import { validate } from "@babel/types";

// 表单数据与验证
const formData = ref({
  effectiveIrrigationArea: "",
  floodDroughtArea: "",
  pumpedIrrigationArea: "",
  electricityRuralArea: "",
  nitrogenousFertilizer: "",
  phosphateFertilizer: "",
  potashFertilizer: "",
  compoundFertilizer: "",
  mulchFilm: "",
  mulchFilmArea: "",
  agriculturalDieselOil: "",
  comsumptionPesticide: "",
  dieselEngines: "",
  gasolineEngines: "",
  largeTractors: "",
  largePower: "",
  miniTractors: "",
  miniPowers: "",
  largeMachinery: "",
  miniMachinery: "",
  pumps: "",
  combine: "",
  combinePower: "",
  motorizedThresher: ""
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
    console.log("close");
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
      console.log("close");
      formData.value = {
        effectiveIrrigationArea: "",
        floodDroughtArea: "",
        pumpedIrrigationArea: "",
        electricityRuralArea: "",
        nitrogenousFertilizer: "",
        phosphateFertilizer: "",
        potashFertilizer: "",
        compoundFertilizer: "",
        mulchFilm: "",
        mulchFilmArea: "",
        agriculturalDieselOil: "",
        comsumptionPesticide: "",
        dieselEngines: "",
        gasolineEngines: "",
        largeTractors: "",
        largePower: "",
        miniTractors: "",
        miniPowers: "",
        largeMachinery: "",
        miniMachinery: "",
        pumps: "",
        combine: "",
        combinePower: "",
        motorizedThresher: ""
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
  const res = await updeteProductionConditionsAndInputs({
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
  const res = await addProductionConditionsAndInputs({
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
    title.value = `编辑${row.year}年农业生产投入情况`;
    for (let i in formData.value) {
      if (row.hasOwnProperty(i)) formData.value[i] = row[i];
    }
  } else {
    edit.value = isEdit;
    console.log(isEdit);
    year.value = newYear;
    title.value = `添加${newYear}年农业生产投入情况`;
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
              label="有效灌溉面积(千公顷)"
              prop="effectiveIrrigationArea"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.effectiveIrrigationArea"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="旱涝保收面积(千公顷)"
              prop="floodDroughtArea"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.floodDroughtArea"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="机电排灌面积(千公顷)"
              prop="pumpedIrrigationArea"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.pumpedIrrigationArea"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="农村用电量(万千瓦小时)"
              prop="floodDroughtArea"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.electricityRuralArea"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="农用化肥施用量-氮肥(吨)"
              prop="nitrogenousFertilizer"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.nitrogenousFertilizer"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="农用化肥施用量-磷肥(吨)"
              prop="phosphateFertilizer"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.phosphateFertilizer"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="农用化肥施用量-钾肥(吨)"
              prop="potashFertilizer"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.potashFertilizer"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="农用化肥施用量-复合肥(吨)"
              prop="compoundFertilizer"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.compoundFertilizer"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="农用塑料薄膜使用量-地膜(吨)"
              prop="mulchFilm"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.mulchFilm" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="农用塑料薄膜使用量-地膜覆盖面积(千公顷)"
              prop="mulchFilmArea"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.mulchFilmArea" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="农用柴油(吨)"
              prop="agriculturalDieselOil"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.agriculturalDieselOil"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="农药使用量(吨)"
              prop="comsumptionPesticide"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.comsumptionPesticide"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="柴油发动机动力(万千瓦)"
              prop="dieselEngines"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.dieselEngines" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="汽油发动机动力(万千瓦)"
              prop="gasolineEngines"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.gasolineEngines"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="大中型拖拉机(台)"
              prop="largeTractors"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.largeTractors" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="大中型拖拉机-动力(万千瓦)"
              prop="largePower"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.largePower" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="小型及扶手拖拉机(台)"
              prop="miniTractors"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.miniTractors" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="小型及扶手拖拉机-动力(万千瓦)"
              prop="miniPowers"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.miniPowers" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="大中型拖拉机配套农具(部)"
              prop="largeMachinery"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.largeMachinery"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="小型拖拉机配套农具(部)"
              prop="miniMachinery"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.miniMachinery" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="农用水泵(台)"
              prop="pumps"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.pumps" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="联合收割机(台)"
              prop="combine"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.combine" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="联合收割机-动力(千瓦)"
              prop="combinePower"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.combinePower" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="机动脱粒机(台)"
              prop="motorizedThresher"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.motorizedThresher"
                placeholder="请输入"
              />
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
