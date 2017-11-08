const { uploader, ci } = require('../qcloud')

module.exports = async ctx => {
    const data = await uploader(ctx.req)

    if (ctx.query.action && ctx.query.action === 'idcard') {
        const { data: identifyResult } = await ci.idCardIdentify([data.imgUrl], 'qcloudtest', 0)
        ctx.state.data = identifyResult.result_list
    } else {
        const { data: ocrResult } = await ci.ocr(data.imgUrl, 'qcloudtest', 0)
        ctx.state.data = ocrResult
    }
}
