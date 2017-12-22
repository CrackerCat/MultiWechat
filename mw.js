var DEBUG_FLAG = true;
function log(msg)
{
    if(DEBUG_FLAG == true){
        send({
            name: '+log',
            payload: msg
        });
        recv('+log-ack', function () {}).wait();
    }
};


var ptrMessageBoxA = Module.findExportByName("user32.dll","MessageBoxA");
var MessageBoxA=new NativeFunction(ptrMessageBoxA,'int',['int','pointer','pointer','int'],'stdcall');
log("ptrMessageBoxA :"+ptrMessageBoxA);
Interceptor.replace(ptrMessageBoxA,new NativeCallback(function (hwnd,pText,pTitle,type) {
    strText=Memory.readUtf8String(pText);
    strTitle=Memory.readUtf8String(pTitle);
    log("MessageBoxA "+strText+" with title "+strTitle);
    strHook=Memory.allocUtf8String("hooked!");
    return MessageBoxA(hwnd,strHook,pTitle,type);

},'int',['int','pointer','pointer','int'],'stdcall'));
