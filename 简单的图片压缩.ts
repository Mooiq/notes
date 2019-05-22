export class imgCompress {


    Img = new Image();  // 假设html中展示图片
    picUrl:any = this.Img.src; // 假设图片的src
    InputImg: HTMLInputElement; // 假设选择文件输入框

    // HTMLInputElement的change事件
    changepic(el: HTMLInputElement = this.InputImg) {
        let that = this;
        var reader = new FileReader();
        let imgFile = el.files[0];
        if (imgFile && imgFile.type){  // 判断选择文件
            if (imgFile.type.indexOf("image") == 0) {
                reader.readAsDataURL(imgFile);
            } else {
                alert("文件类型仅支持图片");
                return;
            }
        }
        reader.onload = function() {
            console.log("读取图片成功");
            that.compress(reader.result, 200, 200).then(data => {
                // console.error(data[0]); // 压缩后的base64地址
                that.picUrl = reader.result; // 用于显示 或 上传
            });
        };
    }

    // 对图片进行压缩
    /**
     * @param {*} base64  // 图片的base64地址
     * @param {number} wid // 压缩后图片宽
     * @param {number} hgt // 压缩后图片高
     */
    compress(base64,wid:number,hgt:number) {
        let img = new Image();
        img.src = base64;
        let imgP = new Promise((resolve, reject) => {
          img.onload = function() {  // 这句很重要 如果立即调用未加载完成时，会画不出来图片 
            let canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            // 瓦片化canvas
            tCanvas = document.createElement("canvas"),
            tctx = tCanvas.getContext("2d"),
            width = wid,
            height = hgt,
            ratio; // 比率
            //图片像素大于400万像素，计算压缩到400万以下
            if ((ratio = (width * height) / 4000000) > 1) {
              ratio = Math.sqrt(ratio);
              width /= ratio;
              height /= ratio;
            } else {
              ratio = 1;
            }
            canvas.width = width;
            canvas.height = height;
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //如果图片太大则使用瓦片绘制
            var count;
            if ((count = (width * height) / 1000000 > 1)) {
              count = ~~(Math.sqrt(count) + 1); //计算分成的瓦片数
              var nw = ~~(width / count);
              var nh = ~~(height / count);
              tCanvas.width = nw;
              tCanvas.height = nh;
              for (var i = 0; i < count; i++) {
                for (var j = 0; j < count; j++) {
                  tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                  ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                }
              }
            } else {
              ctx.drawImage(img, 0, 0, width, height);
            }
            //进行压缩
            var ndata = canvas.toDataURL("image/jpeg", 0.3); // 0.3是转化为图片的质量
            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
            resolve(ndata);
          };
        });
        return Promise.all([imgP]);
    }
}