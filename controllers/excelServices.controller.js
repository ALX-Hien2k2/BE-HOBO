const express = require("express");

const XlsxPopulate = require("xlsx-populate");

const excelServicesTest = (req, res) => {
  res.send("Hello this is excel services!");
};

const excelServicesGetPurchaseOrder = (req, res) => {
  let fileDir ="./resources/static/assets/uploads/po.xlsx";
  XlsxPopulate.fromFileAsync(fileDir).then((workbook) => {
    res.send("OK")
  }).catch((err) => {
    res.send(err);
  })
};

// const save = (req, res) => {

//   console.log(XlsxPopulate.fromFileAsync(file));
//   XlsxPopulate.fromFileAsync(file).then((workbook) => {
//     workbook.sheet(0).cell("A5").value("Hello World");
//     workbook.toFileAsync("out.xlsx");
//     res.send("ok");
//   }).catch((err) => {
//     res.send(err);
//   })
// };
module.exports = {
  excelServicesTest,
  excelServicesGetPurchaseOrder,
};
