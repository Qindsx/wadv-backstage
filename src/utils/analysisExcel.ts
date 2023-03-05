// 读取excel
import { read, utils } from "xlsx";
/**
 *
 * @param file 读取的文件
 * @param column 表头对应的名称
 * @param apartProp column中不需要的名称数组
 * @returns
 */
export const analysisExcel = (file: any, columns, apartProp) => {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function (e: any) {
      const data = e.target.result;
      let datajson = read(data, {
        type: "binary"
      });
      const sheetName = datajson.SheetNames[0];
      const result = utils
        .sheet_to_json(datajson.Sheets[sheetName])
        .map(item => {
          let obj = {};
          columns.forEach(item1 => {
            if (item.hasOwnProperty(item1.label)) {
              if (item1.prop == "year") {
                item[item1.label] = item[item1.label] + "";
              }
              obj[item1.prop] = item[item1.label] + "";
            }
          });
          console.log(obj);
          return obj;
        });
      resolve(result);
    };
    reader.readAsBinaryString(file);
  });
};
