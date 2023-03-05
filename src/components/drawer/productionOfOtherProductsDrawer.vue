<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import commForm from "../form/commForm.vue";
import {
  updeteOtherProductionSituation,
  addOtherProductionSituation
} from "@/api/agriculturalProduction";
import { message } from "@/utils/message";
import { validate } from "@babel/types";

// 表单数据与验证
const formData = ref({
  yearendStockAnimals: "",
  cowsBreed: "",
  beefCattle: "",
  horses: "",
  donkeys: "",
  mutes: "",
  yearendSheep: "",
  yearendHogs: "",
  femalHogs: "",
  slaughteredFattenedHogs: "",
  slaughteredCattle: "",
  slaughteredSheep: "",
  slaughteredPoultry: "",
  milk: "",
  honey: "",
  eggs: "",
  teaOutputAll: "",
  greenTea: "",
  wulongTea: "",
  whiteTea: "",
  otherTea: "",
  teaPlantationArea: "",
  pickedArea: "",
  fruitOutputAll: "",
  peaches: "",
  citrus: "",
  pears: "",
  grapes: "",
  persimmons: "",
  kiwiFruit: "",
  yearendOrchardArea: "",
  citrusArea: "",
  pearsArea: "",
  grapesArea: "",
  peachsArea: "",
  kiwiArea: "",
  aquaticProducts: "",
  fishCaughtAll: "",
  fishCaught: "",
  shrimpsCaught: "",
  shellfhshCaught: "",
  otherCaught: "",
  fishArtificiallyAll: "",
  fishArtificially: "",
  shellfhshArtificially: "",
  shrimpsArtificially: "",
  otherArtificially: "",
  fishCulturedAll: "",
  fishCultured: "",
  shellfhshCultured: "",
  otherCultured: "",
  freshCulturedArea: "",
  paddyCulturedArea: "",
  proliferationArtificiallyArea: ""
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
        yearendStockAnimals: "",
        cowsBreed: "",
        beefCattle: "",
        horses: "",
        donkeys: "",
        mutes: "",
        yearendSheep: "",
        yearendHogs: "",
        femalHogs: "",
        slaughteredFattenedHogs: "",
        slaughteredCattle: "",
        slaughteredSheep: "",
        slaughteredPoultry: "",
        milk: "",
        honey: "",
        eggs: "",
        teaOutputAll: "",
        greenTea: "",
        wulongTea: "",
        whiteTea: "",
        otherTea: "",
        teaPlantationArea: "",
        pickedArea: "",
        fruitOutputAll: "",
        peaches: "",
        citrus: "",
        pears: "",
        grapes: "",
        persimmons: "",
        kiwiFruit: "",
        yearendOrchardArea: "",
        citrusArea: "",
        pearsArea: "",
        grapesArea: "",
        peachsArea: "",
        kiwiArea: "",
        aquaticProducts: "",
        fishCaughtAll: "",
        fishCaught: "",
        shrimpsCaught: "",
        shellfhshCaught: "",
        otherCaught: "",
        fishArtificiallyAll: "",
        fishArtificially: "",
        shellfhshArtificially: "",
        shrimpsArtificially: "",
        otherArtificially: "",
        fishCulturedAll: "",
        fishCultured: "",
        shellfhshCultured: "",
        otherCultured: "",
        freshCulturedArea: "",
        paddyCulturedArea: "",
        proliferationArtificiallyArea: ""
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
  const res = await updeteOtherProductionSituation({
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
  const res = await addOtherProductionSituation({
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
    title.value = `编辑${row.year}年牧渔、茶叶和水果生产情况`;
    for (let i in formData.value) {
      if (row.hasOwnProperty(i)) formData.value[i] = row[i];
    }
  } else {
    edit.value = isEdit;
    console.log(isEdit);
    year.value = newYear;
    title.value = `添加${newYear}年牧渔、茶叶和水果生产情况`;
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
              label="年末大牲畜存栏(头)"
              prop="yearendStockAnimals"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.yearendStockAnimals"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="良种及改良种乳牛(头)"
              prop="cowsBreed"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.cowsBreed" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="肉用牛(头)"
              prop="cowsBreed"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.cowsBreed" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="肉用牛(头)"
              prop="beefCattle"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.beefCattle" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="马(头)"
              prop="horses"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.horses" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="驴(头)"
              prop="donkeys"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.donkeys" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="骡(头)"
              prop="mutes"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.mutes" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="年末羊只数(头)"
              prop="yearendSheep"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.yearendSheep" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="年末牲猪存栏(万头)"
              prop="yearendHogs"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.yearendHogs" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="能繁母猪(万头)"
              prop="femalHogs"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.femalHogs" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="全年肉猪出栏(万头/吨)"
              prop="slaughteredFattenedHogs"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.slaughteredFattenedHogs"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="全年肉猪出栏(万头/吨)"
              prop="slaughteredFattenedHogs"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.slaughteredFattenedHogs"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="全年出售和自宰肉用牛(头/吨)"
              prop="slaughteredCattle"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.slaughteredCattle"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="自宰肉羊(只/吨)"
              prop="slaughteredSheep"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.slaughteredSheep"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="自宰家禽(万只/吨)"
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
              label="牛奶产量(吨)"
              prop="milk"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.milk" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="蜂蜜(吨)"
              prop="honey"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.honey" placeholder="请输入" />
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
              label="茶叶总产量(吨)"
              prop="teaOutputAll"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.teaOutputAll" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="绿茶(吨)"
              prop="greenTea"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.greenTea" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="清茶(吨)"
              prop="wulongTea"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.wulongTea" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="白茶(吨)"
              prop="whiteTea"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.whiteTea" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="其他茶(吨)"
              prop="otherTea"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.otherTea" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="年末茶园面积(公顷)"
              prop="teaPlantationArea"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.teaPlantationArea"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="采摘面积(公顷)"
              prop="pickedArea"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.pickedArea" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="水果产量(吨)"
              prop="fruitOutputAll"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.fruitOutputAll"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="桃子(吨)"
              prop="peaches"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.peaches" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="柑橘(吨)"
              prop="citrus"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.citrus" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="梨子(吨)"
              prop="pears"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.pears" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="葡萄(吨)"
              prop="grapes"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.grapes" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="柿子(吨)"
              prop="persimmons"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.persimmons" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="猕猴桃(吨)"
              prop="kiwiFruit"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.kiwiFruit" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="年末果园面积(公顷)"
              prop="yearendOrchardArea"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.yearendOrchardArea"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="柑橘园面积(公顷)"
              prop="citrusArea"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.citrusArea" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="梨园面积(公顷)"
              prop="pearsArea"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.pearsArea" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="葡萄园面积(公顷)"
              prop="grapesArea"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.grapesArea" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="桃园面积(公顷)"
              prop="peachsArea"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.peachsArea" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="猕猴桃面积(公顷)"
              prop="kiwiArea"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.kiwiArea" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="水产产量(吨)"
              prop="aquaticProducts"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.aquaticProducts"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="淡水捕捞产量(吨)"
              prop="fishCaughtAll"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.fishCaughtAll" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="鱼类捕捞(吨)"
              prop="fishCaught"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.fishCaught" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="虾蟹类捕捞(吨)"
              prop="shrimpsCaught"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.shrimpsCaught" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="贝类捕捞(吨)"
              prop="shellfhshCaught"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.shellfhshCaught"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="其他类捕捞(吨)"
              prop="otherCaught"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.otherCaught" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="淡水养殖产量(吨)"
              prop="fishArtificiallyAll"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.fishArtificiallyAll"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="鱼类养殖(吨)"
              prop="fishArtificially"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.fishArtificially"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="贝类养殖(吨)"
              prop="shellfhshArtificially"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.shellfhshArtificially"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="虾蟹养殖(吨)"
              prop="shrimpsArtificially"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.shrimpsArtificially"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="其他类养殖(吨)"
              prop="otherArtificially"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.otherArtificially"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="增值养殖产量(吨)"
              prop="fishCulturedAll"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.fishCulturedAll"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="鱼类增殖(吨)"
              prop="fishCultured"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.fishCultured" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="贝类增值(吨)"
              prop="shellfhshCultured"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.shellfhshCultured"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="其他增值类(吨)"
              prop="otherCultured"
              :rules="rules.doblueVaild"
            >
              <el-input v-model="formData.otherCultured" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="淡水养殖面积(公顷)"
              prop="freshCulturedArea"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.freshCulturedArea"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div class="grid grid-cols-2 gap-2 w-full">
            <el-form-item
              class="col-span-1"
              label="稻田养殖面积(公顷)"
              prop="paddyCulturedArea"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.paddyCulturedArea"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="col-span-1"
              label="增值养殖面积(公顷)"
              prop="proliferationArtificiallyArea"
              :rules="rules.doblueVaild"
            >
              <el-input
                v-model="formData.proliferationArtificiallyArea"
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
