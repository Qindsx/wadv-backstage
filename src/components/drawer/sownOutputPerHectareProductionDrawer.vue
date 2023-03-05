<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import commForm from "../form/commForm.vue";
import {
  updeteCropProductione,
  addCropProduction
} from "@/api/agriculturalProduction";
import { message } from "@/utils/message";
import { validate } from "@babel/types";

// 表单数据与验证
const formData = ref({
  grainCrops: "",
  summerGrainCrops: "",
  wheat: "",
  soybeanSummer: "",
  tuberCropsSummer: "",
  otherCerealsSummer: "",
  earlySeasonRice: "",
  autumnGrainCrops: "",
  paddyRice: "",
  midSeasonRice: "",
  doubleRotationRice: "",
  corn: "",
  soybeanAutumn: "",
  tuberCropsAutumn: "",
  otherCerealsAutumn: "",
  cotton: "",
  oilBerain: "",
  rapeSeeds: "",
  peanuts: "",
  sesame: "",
  fiberCrops: "",
  sugarCrops: "",
  tobacco: "",
  herbCrops: "",
  vagetableMelons: "",
  vagetable: "",
  melons: ""
});

const CLASSIFY = {
  sown: "播种面积(公顷)",
  output: "总产量(吨)",
  perHectare: "单位面积产量(公斤/公顷)"
};

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
const classify = ref("");

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
        grainCrops: "",
        summerGrainCrops: "",
        wheat: "",
        soybeanSummer: "",
        tuberCropsSummer: "",
        otherCerealsSummer: "",
        earlySeasonRice: "",
        autumnGrainCrops: "",
        paddyRice: "",
        midSeasonRice: "",
        doubleRotationRice: "",
        corn: "",
        soybeanAutumn: "",
        tuberCropsAutumn: "",
        otherCerealsAutumn: "",
        cotton: "",
        oilBerain: "",
        rapeSeeds: "",
        peanuts: "",
        sesame: "",
        fiberCrops: "",
        sugarCrops: "",
        tobacco: "",
        herbCrops: "",
        vagetableMelons: "",
        vagetable: "",
        melons: ""
      };
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
  const res = await updeteCropProductione({
    data: { ...formData.value, classify: classify.value },
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
  const res = await addCropProduction({
    data: [{ ...formData.value, year: year.value, classify: classify.value }]
  });
  if (res.message) {
    emit("done");
    drawer2.value = false;
    ElMessage.success(res.message);
  }
}

// 抽屉初始值
const open = (isEdit: boolean, row, newYear: string, classifyValue: string) => {
  console.log(newYear);
  if (isEdit) {
    edit.value = isEdit;
    year.value = row.year;
    classify.value = row.classify;
    title.value = `编辑${row.year}年农作物${CLASSIFY[row.classify]}`;
    for (let i in formData.value) {
      if (row.hasOwnProperty(i)) formData.value[i] = row[i];
    }
  } else {
    edit.value = isEdit;
    console.log(isEdit);
    year.value = newYear;
    classify.value = classifyValue;
    title.value = `添加${newYear}年农作物${CLASSIFY[classifyValue]}`;
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
          <el-form-item
            class="flex-1"
            label="粮食作物"
            prop="grainCrops"
            :rules="rules.doblueVaild"
          >
            <el-input v-model="formData.grainCrops" placeholder="请输入" />
          </el-form-item>

          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="夏收粮食"
              prop="summerGrainCrops"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.summerGrainCrops"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="小麦"
              prop="wheat"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.wheat" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="豆类"
              prop="soybeanSummer"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.soybeanSummer" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="薯类"
              prop="tuberCropsSummer"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.tuberCropsSummer"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="其他小谷物-夏"
              prop="otherCerealsSummer"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.otherCerealsSummer"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="早稻"
              prop="earlySeasonRice"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.earlySeasonRice"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="秋收粮食"
              prop="autumnGrainCrops"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.autumnGrainCrops"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="稻谷"
              prop="paddyRice"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.paddyRice" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="中稻"
              prop="midSeasonRice"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.midSeasonRice" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="双季晚稻"
              prop="doubleRotationRice"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.doubleRotationRice"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="玉米"
              prop="corn"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.corn" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="豆类"
              prop="soybeanAutumn"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.soybeanAutumn" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="薯类"
              prop="tuberCropsAutumn"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.tuberCropsAutumn"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="其他小谷物-秋"
              prop="otherCerealsAutumn"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.otherCerealsAutumn"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="棉花"
              prop="cotton"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.cotton" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="油料"
              prop="oilBerain"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.oilBerain" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="油菜籽"
              prop="rapeSeeds"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.rapeSeeds" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="花生"
              prop="peanuts"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.peanuts" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="芝麻"
              prop="sesame"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.sesame" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="麻类"
              prop="fiberCrops"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.fiberCrops" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="糖料"
              prop="sugarCrops"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.sugarCrops" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="烟草"
              prop="tobacco"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.tobacco" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="药材"
              prop="herbCrops"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.herbCrops" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="蔬菜与瓜果"
              prop="vagetableMelons"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.vagetableMelons"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="蔬菜"
              prop="vagetable"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.vagetable" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="瓜果"
              prop="melons"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.melons" placeholder="请输入" />
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
