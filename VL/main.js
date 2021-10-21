$(document).ready(function(){
    document.registerElement('v-area', {
        prototype: Object.create(HTMLButtonElement.prototype),
        extends: 'div'
    });

    document.registerElement('v-pipeline', {
        prototype: Object.create(HTMLButtonElement.prototype),
        extends: 'div'
    });

    document.registerElement('v-stage', {
        prototype: Object.create(HTMLButtonElement.prototype),
        extends: 'div'
    });

    document.registerElement('v-kernel', {
        prototype: Object.create(HTMLButtonElement.prototype),
        extends: 'span'
    });

    document.registerElement('v-dev', {
        prototype: Object.create(HTMLButtonElement.prototype),
        extends: 'span'
    });

    app = {}
    app.city = {
        kernels:{},
        areas:{},
        states:{}
    }; 
    
   
    $("#city > v-kernel").each(function(){
        app.city.kernels[$(this).attr("name")] = {"states": $(this).data("states")};
        //console.log($(this).data("states"))
    });

    offload_device("#klausdev");

    //console.log(get_kernel("#city" , "bloom").data("states"));
});

function offload_device(id){
    device = $(id);
    pipeline = $(device.attr("pipeline"));
    pipeline.children().each(function(){
        stage = $(this);
        stage.children().each(function(){
            importfrom = $(this).data("importfrom");
            if(importfrom){
                console.log("camehere");
                kernel_name = $(this).data("name");
                kernel = get_kernel(importfrom, kernel_name); 
            }else{
                kernel = $(this)
            }

            console.log(kernel.data("states"));

        });
        
        
    });
};

function get_kernel(area , name){
   
    return $(area).find("[data-name='"+name+"']");
}