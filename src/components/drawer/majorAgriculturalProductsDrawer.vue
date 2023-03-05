<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import commForm from "../form/commForm.vue";
import {
  updeteAgriculturalProduction,
  addAgriculturalProduction
} from "@/api/inputsAndOutputs";
import { message } from "@/utils/message";
import { validate } from "@babel/types";

// 表单数据与验证
const formData = ref({
  grains: "",
  cotton: "",
  oilBearing: "",
  vagetables: "",
  fruit: "",
  slaughteredHogs: "",
  slaughteredPoultry: "",
  eggs: "",
  milk: "",
  aquaticProducts: ""
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
      // formData.value = {
      //   total: "",
      //   farming: "",
      //   fishery: "",
      //   forestry: "",
      //   husbandry: "",
      //   industrialService: ""
      // };
      formRefD.value.resetFields();
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
  const res = await updeteAgriculturalProduction({
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
  const res = await addAgriculturalProduction({
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
    title.value = `编辑${row.year}年主要农产品产量`;
    for (let i in formData.value) {
      if (row.hasOwnProperty(i)) formData.value[i] = row[i];
    }
  } else {
    edit.value = isEdit;
    console.log(isEdit);
    year.value = newYear;
    title.value = `添加${newYear}年主要农产品产量模板`;
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
              label="粮食(吨)"
              prop="grains"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.grains" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="棉花(吨)"
              prop="cotton"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.cotton" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="油料(吨)"
              prop="oilBearing"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.oilBearing" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="蔬菜(吨)"
              prop="vagetables"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.vagetables" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="水果(吨)"
              prop="fruit"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.fruit" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="生猪出栏(万头)"
              prop="slaughteredHogs"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.slaughteredHogs"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="家禽出笼(万只)"
              prop="slaughteredPoultry"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.slaughteredPoultry"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="禽蛋产量(吨)"
              prop="eggs"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.eggs" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="牛奶(吨)"
              prop="milk"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.milk" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="水产品(吨)"
              prop="aquaticProducts"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.aquaticProducts"
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
