export const schemaForm = {
  schema: {
    type: "object",
    required: [
      "townshipGov",
      "townGov",
      "subdistrictOff",
      "villagersSub",
      "villagersCom",
      "agriculturalLaborers",
      "noAgriculturalLaborers",
      "agricultureEmployees",
      "agricultureEmployees",
      "villagesBroad",
      "villagesPropBroad",
      "villagesTv",
      "villagesWater",
      "villagesPropWater"
    ],
    properties: {
      townshipGov: {
        title: "乡政府(个)",
        type: "string",
        maxLength: 0,
        minLength: 0,
        "ui:options": {
          labelWidth: "148px",
          placeholder: "请输入",
          clearable: true
        }
      },
      townGov: {
        title: "镇政府(个)",
        type: "string",
        "ui:options": {
          labelWidth: "128px",
          placeholder: "请输入"
        }
      },
      subdistrictOff: {
        title: "办事处(个)",
        type: "string",
        "ui:options": {
          placeholder: "请输入"
        }
      },
      villagersSub: {
        title: "村民小组(个)",
        type: "string",
        "ui:options": {
          placeholder: "请输入"
        }
      },
      villagersCom: {
        title: "村委会(个)",
        type: "string",
        "ui:options": {
          placeholder: "请输入"
        }
      },
      agriculturalLaborers: {
        title: "乡村农林牧渔业(万人)",
        type: "string",
        "ui:options": {
          placeholder: "请输入"
        }
      },
      noAgriculturalLaborers: {
        title: "乡村非农业从业人员(个)",
        type: "string",
        "ui:options": {
          placeholder: "请输入"
        }
      },
      agricultureEmployees: {
        title: "国营农场非农业从业人员(万人)",
        type: "string",
        "ui:options": {
          placeholder: "请输入"
        }
      },
      villagesBroad: {
        title: "通宽带村数(个)",
        type: "string",
        "ui:options": {
          placeholder: "请输入"
        }
      },
      villagesPropBroad: {
        title: "通宽带村数占全部村委会比重(%)",
        type: "string",
        "ui:options": {
          placeholder: "请输入"
        }
      },
      villagesTv: {
        title: "通有线电视村数(个)",
        type: "string",
        "ui:options": {
          placeholder: "请输入"
        }
      },
      villagesWater: {
        title: "自来水受益村数(个)",
        type: "string",
        "ui:options": {
          placeholder: "请输入"
        }
      },
      villagesPropWater: {
        title: "自来水受益村数占全部村委会比重(%)",
        type: "string",
        "ui:options": {
          placeholder: "请输入"
        }
      }
    },
    "ui:order": [
      "townshipGov",
      "townGov",
      "subdistrictOff",
      "villagersSub",
      "villagersCom",
      "agriculturalLaborers",
      "noAgriculturalLaborers",
      "agricultureEmployees",
      "agricultureEmployees",
      "villagesBroad",
      "villagesPropBroad",
      "villagesTv",
      "villagesWater",
      "villagesPropWater"
    ]
  },
  uiSchema: {},
  formFooter: {
    show: false
  },
  formProps: {
    layoutColumn: 2,
    labelWidth: "96px",
    labelSuffix: "："
  }
};
