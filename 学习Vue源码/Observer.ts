
// 循环data中每个属性，并监听每个属性
function observer(data:Object,callback:Function){
    Object.keys(data).forEach((key)=>{
        defineReactive(data,key,data[key],callback);
    })
}

// 监听某个对象上的某个属性（就是拦截某个属性的存取，来做出相应的callback）
function defineReactive (obj:Object, key:string, val:any, callback:Function){
    // 这里的参数val可能是字符串、对象、数组或其他，这里只考虑最简单的情况
    Object.defineProperty(obj,key,{
        enumerable: true,
        configurable: true,
        get:()=>{

            return val
        },
        set: newVal=>{
            val = newVal;
            callback();
        }
    })
}

// 代理
function proxy(){
    let that = this; // 指Vue对象
    Object.keys(that.data).forEach(key=>{
        Object.defineProperty(that.data,key,{
            enumerable:true,
            configurable:true,
            get:()=>{
                return that.data[key]
            },
            set:(newVal)=>{
                that.data[key] = newVal;
            }
        })
    })
    
}

// 依赖收集 每个属性都会有一个依赖收集器 用于存放这个属性的所有订阅者
function dep(){
    this.dep = [];
    arguments.callee.prototype = {
        add: (watcher)=>{
            this.dep.push(watcher)
        },
        remove: (watcher)=>{
            const index = this.dep.indexOf(watcher);
            if(index > -1){
                this.dep.splice(index,1);
            }
        },
        notify: ()=>{
            this.dep.forEach(watcher => {
                watcher.update();
            });
        }
    }
}

// watcher 订阅者 属性变化时修改对应的视图
function watcher(vm,exp,cd){
    
}