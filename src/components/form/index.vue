<script setup lang="ts">
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import VueForm from "@lljj/vue3-form-element";
import { schemaForm } from "./schema";

defineOptions({
  name: "formDrawer"
});

const drawer2 = ref(false);
const open = formData => {
  console.log(formData);
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

// 表单数据与
const formData = ref<any>();

defineExpose({
  drawer2,
  open
});
</script>

<template>
  <div>
    <el-drawer size="45%" v-model="drawer2" direction="rtl">
      <template #header>
        <h4>set title by slot</h4>
      </template>
      <template #default>
        <VueForm
          v-model="formData"
          :schema="schemaForm.schema"
          :formFooter="schemaForm.formFooter"
          :uiSchema="schemaForm.uiSchema"
          :formProps="schemaForm.formProps"
        ></VueForm>
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
