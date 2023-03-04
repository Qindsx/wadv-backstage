<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import commForm from "../form/commForm.vue";
import { updeteGrassroots, addGrassroots } from "@/api/basic";
import { message } from "@/utils/message";
import { validate } from "@babel/types";

// 表单数据与验证
const formData = ref({
  townshipGov: "",
  townGov: "",
  subdistrictOff: "",
  villagersSub: "",
  villagersCom: "",
  agriculturalLaborers: "",
  noAgriculturalLaborers: "",
  agricultureEmployees: "",
  noAgricultureEmployees: "",
  villagesBroad: "",
  villagesPropBroad: "",
  villagesTv: "",
  villagesPropTv: "",
  villagesWater: "",
  villagesPropWater: ""
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
          console.log(formData.value.townshipGov);
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
  const res = await updeteGrassroots({
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
  const res = await addGrassroots({
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
    title.value = `编辑${row.year}年农村基层组织﹑户数、人口、从业人员`;
    for (let i in formData.value) {
      if (row.hasOwnProperty(i)) formData.value[i] = row[i];
    }
  } else {
    edit.value = isEdit;
    console.log(isEdit);
    year.value = newYear;
    title.value = `编辑${newYear}年农村基层组织﹑户数、人口、从业人员`;
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
              label="乡政府(个):"
              prop="townshipGov"
              :rules="rules.intVaild"
            >
              <!-- {{ rules.intVaild }} -->
              <el-input v-model="formData.townshipGov" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="镇政府(个):"
              prop="townGov"
              :rules="rules.intVaild"
            >
              <el-input v-model="formData.townGov" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              prop="subdistrictOff"
              label="办事处(个):"
              :rules="rules.intVaild"
            >
              <el-input
                v-model="formData.subdistrictOff"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="村民小组(个):"
              prop="villagersSub"
              :rules="rules.intVaild"
            >
              <el-input v-model="formData.villagersSub" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="村委会(个):"
              prop="villagersCom"
              :rules="rules.intVaild"
            >
              <el-input v-model="formData.villagersCom" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="乡村农林牧渔业(万人):"
              prop="agriculturalLaborers"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.agriculturalLaborers"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="乡村非农业从业人员(个):"
              prop="noAgriculturalLaborers"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.noAgriculturalLaborers"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="国营农场农林牧渔业(万人):"
              prop="agricultureEmployees"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.agricultureEmployees"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="国营农场非农业从业人员(万人):"
              prop="noAgricultureEmployees"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.noAgricultureEmployees"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="通宽带村数(个):"
              prop="villagesBroad"
              :rules="rules.intVaild"
            >
              <el-input v-model="formData.villagesBroad" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="通宽带村数占全部村委会比重(%):"
              prop="villagesPropBroad"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.villagesPropBroad"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="通有线电视村数(个):"
              prop="villagesTv"
              :rules="rules.intVaild"
            >
              <el-input v-model="formData.villagesTv" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="通有线电视村数占全部村委会比重(%):"
              prop="villagesPropTv"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.villagesPropTv"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="自来水受益村数(个):"
              prop="villagesWater"
              :rules="rules.intVaild"
            >
              <el-input v-model="formData.villagesWater" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="自来水受益村数占全部村委会比重(%):"
              prop="villagesPropWater"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.villagesPropWater"
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
