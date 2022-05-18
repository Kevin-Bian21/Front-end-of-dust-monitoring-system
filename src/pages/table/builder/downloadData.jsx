import ExportExcel from 'js-export-excel';

export function downloadExcel(data) {
  let excel = {};
  excel.fileName = '系统环境监测数据';
  let dataTable = [];
  if (data) {
    for (let colum of data) {
      let obj = {
        监测位置: colum.monitorLocal,
        粉尘浓度: colum.dustDensity,
        温度: colum.temperature,
        湿度: colum.humidity,
        风速: colum.windSpeed,
        监测时间: colum.monitorDateTime,
      };
      dataTable.push(obj);
    }
  }
  excel.datas = [
    {
      sheetData: dataTable,
      sheetHeader: ['监测位置', '粉尘浓度', '温度', '湿度', '风速', '监测时间'],
      columnWidths: [10, 10, 10, 10, 10, 10],
    },
  ];

  let toExcel = new ExportExcel(excel);
  toExcel.saveExcel();
}
