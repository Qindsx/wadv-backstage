<script setup lang="ts">
import { ref, watch } from "vue";
import { ElMessageBox } from "element-plus";
import VueForm from "@lljj/vue3-form-element";
// import { schemaForm } from "./schema";
import formConfig from "./formConfig";

// 表单配置数据与校验规则
const props = defineProps<{
  formName: string;
  formData: any;
}>();

// 表单数据与
const formData = ref<any>();
const initFormData = (data: {}) => {
  for (let i in data) {
    formData[i] = data[i];
  }
};

watch(
  () => props,
  () => {
    console.log(props);
    console.log(formConfig[props.formName]);
  },
  { deep: true, immediate: true }
);

const drawer2 = ref(false);
const open = row => {
  // console.log(formData);
  // console.log(props);
  // formData.value = formData;
  // props.formOptions.forEach(item => {
  //   if (["选择", "年份", "操作"].indexOf(item.label) != -1) {
  //     //
  //     formData.value[item.prop] = "";
  //   }
  // });
  // console.log(formData.value);
  drawer2.value = true;
};

const direction = ref("rtl");
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure you want to close this?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
function cancelClick() {
  drawer2.value = false;
}
function confirmClick() {
  ElMessageBox.confirm(`Are you confirm to chose?`)
    .then(() => {
      drawer2.value = false;
    })
    .catch(() => {
      // catch error
    });
}
defineExpose({
  formData,
  initFormData
});
</script>

<template>
  <div>
    <el-drawer size="45%" v-model="drawer2" direction="rtl">
      <template #header>
        <h4>set title by slot</h4>
      </template>
      <template #default>
        {{ formData }}
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <div v-for="item of formConfig[props.formName]">
            <el-form-item :label="item.label" :prop="item.prop">
              <el-input v-model="formData[item.prop]" placeholder="请输入" />
            </el-form-item>
          </div>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">cancel</el-button>
          <el-button type="primary" @click="confirmClick">confirm</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<style scoped></style>
