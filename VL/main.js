$(document).ready(function(){
    /* Declaring a bunch of Vazado Tags */
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

    /*End of Declaring Vazado Tags*/

    //Just an idea of what an area object will look like
    //it has kernels (global kernels), areas, devices etc

    app = {}
    app.city = {
        kernels:{},
        areas:{},
        devices:{}
    }; 
    
    /*An example of a VL function that allows a device to be offloaded
        1. The device is already created in the Topology environment (see line 29)
        2. From the device we can get the pipeline
        3. From the pipeline we can get the stages
        4. From the stages we can get the kernels
        5. From the kernels we can get states, expected parameters (device data) and generate ISA for the device
        6. Note that in this example we are importing a global kernel - authentication - which is an example of compacting data
    */
    offload_device("#klausdev");

    //console.log(get_kernel("#city" , "bloom").data("states"));
});

function offload_device(id){
    //get device object
    device = $(id);
    //get pipeline
    pipeline = $(device.attr("pipeline"));
    //get all stages
    pipeline.children().each(function(){
        stage = $(this);
        //get all kernels
        stage.children().each(function(){
            importfrom = $(this).data("importfrom");
            //if kernel is a placeholder for a global kernel fetch the original
            if(importfrom){
                console.log("camehere");
                kernel_name = $(this).data("name");
                kernel = get_kernel(importfrom, kernel_name); 
            }else{
                //else use the current kernel
                kernel = $(this)
            }
            //grab all kernel attributes
            console.log(kernel.data("states"));

        });
        
        
    });
};

//this function find the Area that owns the global kernel and returns the original kernel object
function get_kernel(area , name){
   
    return $(area).find("[data-name='"+name+"']");
}