// 숫자 자동 채번기능 제공을 위한 mongoose-sequence 모듈 패키치 설치 및 참조
// npm i mongoose-sequence@5.3.1
// mongoose 패키치 참조
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const { Schema } = mongoose;

// 게시글 스키마 정의
const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    article_type_code: {
        type: Number,
        required: true,
    },
    contents: {
        type: String,
        required: false,
    },
    view_count: {
        type: Number,
        required: true,
    },
    is_display_code: {
        type: Number,
        required: true,
    },
    ip_address: {
        type: String,
        required: false,
    },
    edit_date: {
        type: Date,
        default: Date.now,
    },
    edit_member_id: {
        type: Number,
        required: false,
    },
});

// 자동채번 컬럼 생성 및 콜렉션에 추가
articleSchema.plugin(AutoIncrement, { inc_field: "article_id" }); //article_id는 1,2,3,4..

// mongoose.model("콜렉션명", 스키마)로 모델을 생성합니다.
module.exports = mongoose.model('Article', articleSchema);