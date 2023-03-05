<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import commForm from "../form/commForm.vue";
import {
  updeteCategoryOutputValue,
  addCategoryOutputValue
} from "@/api/inputsAndOutputs";
import { message } from "@/utils/message";
import { validate } from "@babel/types";

// 表单数据与验证
const formData = ref({
  farming: "",
  cereal: "",
  beans: "",
  cotton: "",
  oilCrops: "",
  fiberCrops: "",
  sugarCrops: "",
  tobacco: "",
  herbCrops: "",
  tuberCrops: "",
  vagetable: "",
  teaFruit: "",
  flower: "",
  otherCrops: "",
  wildPlants: "",
  forestry: "",
  animalHusbandry: "",
  fishery: "",
  industrialService: ""
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
        farming: "",
        cereal: "",
        beans: "",
        cotton: "",
        oilCrops: "",
        fiberCrops: "",
        sugarCrops: "",
        tobacco: "",
        herbCrops: "",
        tuberCrops: "",
        vagetable: "",
        teaFruit: "",
        flower: "",
        otherCrops: "",
        wildPlants: "",
        forestry: "",
        animalHusbandry: "",
        fishery: "",
        industrialService: ""
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
  const res = await updeteCategoryOutputValue({
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
  const res = await addCategoryOutputValue({
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
    title.value = `编辑${row.year}年农林牧渔业分类总产值`;
    for (let i in formData.value) {
      if (row.hasOwnProperty(i)) formData.value[i] = row[i];
    }
  } else {
    edit.value = isEdit;
    console.log(isEdit);
    year.value = newYear;
    title.value = `添加${newYear}年农林牧渔业分类总产值`;
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
              label="农业产值"
              prop="farming"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.farming" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="谷物"
              prop="farming"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.cereal" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="豆类"
              prop="beans"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.beans" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="棉花"
              prop="cotton"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.cotton" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="油料"
              prop="oilCrops"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.oilCrops" placeholder="请输入" />
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
              prop="farming"
              :rules="rules.sugarCrops"
            >
              <el-input v-model="formData.sugarCrops" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="烟草"
              prop="tobacco"
              :rules="rules.tobacco"
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
              label="薯类"
              prop="tuberCrops"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.tuberCrops" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="蔬菜和菌子"
              prop="vagetable"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.vagetable" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="茶桑果"
              prop="teaFruit"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.teaFruit" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="花卉园艺"
              prop="flower"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.flower" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="其他作物"
              prop="otherCrops"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.otherCrops" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="采集野生植物"
              prop="wildPlants"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.wildPlants" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="林业产值"
              prop="forestry"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.forestry" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="牧业产值"
              prop="animalHusbandry"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.animalHusbandry"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="渔业产值"
              prop="fishery"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.fishery" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="农业产值"
              prop="farming"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.farming" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="服务业产值"
              prop="industrialService"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.industrialService"
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
