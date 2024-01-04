// 관리자 사이트 관리자 계정 정보 관리 라우팅 기능

// 라우터의 기본주소는
// http://localhost:3001/admin/~

var express = require("express");
var router = express.Router();

var moment = require("moment");
var Admin = require("../schemas/admin.js");

router.get("/list", async (req, res) => {
    var searchOption = {
        email: "",
        name: "",
        telephone: "",
    };
    try {
        var admin = await Admin.find({});
        res.render("admin/list.ejs", { admin, searchOption, moment });
    } catch (err) {
        console.error("Error reading the file:", err);
        res.status(500).send("Error reading the user data.");
    }
});

router.post("/list", async (req, res) => {
    var { email, name, telephone } = req.body;

    var searchOption = {
        email,
        name,
        telephone,
    };

    var whereClause = {};

    if (searchOption.email) {
        whereClause.email = searchOption.email;
    }
    if (searchOption.admin_name) {
        whereClause.admin_name = searchOption.admin_name;
    }
    if (searchOption.telephone) {
        whereClause.telephone = searchOption.telephone;
    }

    var admin = await Admin.find(whereClause);
    res.render("admin/list.ejs", { admin, searchOption, moment });
});

router.get("/create", async (req, res) => {
    res.render("admin/create.ejs");
});

router.post("/create", async (req, res) => {
    var {
        company_code,
        department_name,
        admin_id,
        admin_password,
        admin_password_confirm,
        admin_name,
        email,
        telephone,
        use_status_code,
    } = req.body;
    reg_user_id = 1;
    reg_date = Date.now();

    var admin = {
        company_code,
        department_name,
        admin_id,
        admin_password,
        admin_name,
        email,
        telephone,
        use_status_code,
        reg_user_id,
        reg_date,
    };

    await Admin.create(admin);

    res.redirect("/admin/list");
});

router.get("/modify/:id", async (req, res) => {
    var admin_member_id = req.params.id;
    var admin = await Admin.findOne({ admin_member_id });

    res.render("admin/modify.ejs", { admin });
});

router.post("/modify/:id", async (req, res) => {
    var admin_member_id = req.params.id;

    var {
        company_code,
        department_name,
        admin_id,
        admin_password,
        admin_name,
        email,
        telephone,
        use_status_code,
    } = req.body;
    edit_user_id = 1;
    edit_date = Date.now();

    var admin = {
        company_code,
        department_name,
        admin_id,
        admin_password,
        admin_name,
        email,
        telephone,
        use_status_code,
        edit_user_id,
        edit_date,
    };

    await Admin.updateOne({ admin_member_id }, admin);
    res.redirect("/admin/list");
});

router.get("/delete", async (req, res) => {
    var admin_member_id = req.query.id;
    await Admin.deleteOne({ admin_member_id });
    res.redirect("/admin/list", { deletedCnt });
});

module.exports = router;
