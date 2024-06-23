import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    // các ảnh trong web chỉ đc lấy từ trong file này 
    app.set("view engine", "ejs");
    // thư viện như jsp và blade : cho phép gõ logic trong html
    app.set("views", "./src/views")
    // set đường dẫn lấy view 
}

module.exports = configViewEngine;