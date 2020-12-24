
(function () {  
    var  
     form = $('.form'),  
     cache_width = form.width(),  
     a4 = [595.28, 841.89]; // for a4 size paper width and height  

    $('#create_pdf').on('click', function () {  
        $('body').scrollTop(0);  
        createPDF();  
    });  
    //create pdf  
    function createPDF() {  
        getCanvas().then(function (canvas) {  
            var  
             img = canvas.toDataURL("image/png"),  
             doc = new jsPDF({  
                 unit: 'px',  
                 format: 'a4'  
             });  
            doc.addImage(img, 'JPEG', 20, 20);  
            doc.save('Bhavdip-html-to-pdf.pdf');  
            form.width(cache_width);  
        });  
    }  

    // create canvas object  
    function getCanvas() {  
        form.width((a4[0] * 1.33333) - 80).css('max-width', 'none');  
        return html2canvas(form, {  
            imageTimeout: 2000,  
            removeContainer: true  
        });  
    }  

}());  

(function ($) {  
    $.fn.html2canvas = function (options) {  
        var date = new Date(),  
        $message = null,  
        timeoutTimer = false,  
        timer = date.getTime();  
        html2canvas.logging = options && options.logging;  
        html2canvas.Preload(this[0], $.extend({  
            complete: function (images) {  
                var queue = html2canvas.Parse(this[0], images, options),  
                $canvas = $(html2canvas.Renderer(queue, options)),  
                finishTime = new Date();  

                $canvas.css({ position: 'absolute', left: 0, top: 0 }).appendTo(document.body);  
                $canvas.siblings().toggle();  

                $(window).click(function () {  
                    if (!$canvas.is(':visible')) {  
                        $canvas.toggle().siblings().toggle();  
                        throwMessage("Canvas Render visible");  
                    } else {  
                        $canvas.siblings().toggle();  
                        $canvas.toggle();  
                        throwMessage("Canvas Render hidden");  
                    }  
                });  
                throwMessage('Screenshot created in ' + ((finishTime.getTime() - timer) / 1000) + " seconds<br />", 4000);  
            }  
        }, options));  

        function throwMessage(msg, duration) {  
            window.clearTimeout(timeoutTimer);  
            timeoutTimer = window.setTimeout(function () {  
                $message.fadeOut(function () {  
                    $message.remove();  
                });  
            }, duration || 2000);  
            if ($message)  
                $message.remove();  
            $message = $('<div ></div>').html(msg).css({  
                margin: 0,  
                padding: 10,  
                background: "#000",  
                opacity: 0.7,  
                position: "fixed",  
                top: 10,  
                right: 10,  
                fontFamily: 'Tahoma',  
                color: '#fff',  
                fontSize: 12,  
                borderRadius: 12,  
                width: 'auto',  
                height: 'auto',  
                textAlign: 'center',  
                textDecoration: 'none'  
            }).hide().fadeIn().appendTo('body');  
        }  
    };  
})(jQuery);  

var varContent = [];
const setValues = () => {
    if (document.querySelectorAll){
        var clsElements = document.querySelectorAll(".variable");
        clsElements.forEach(element => {
            varContent.push(element.value) 
            // console.log(varContent);
        })}
}

const getValues = () => {
    for (let i = 1; i <= varContent.length; i++) {
        document.getElementById('c'+i).innerText = varContent[i-1]
        
    }
}

document.getElementById('myBtn').addEventListener('click', function (e) {
    
    document.getElementById('create_pdf').className = "btn btn-success btn-lg mx-3"
    setValues()
    getValues()

})


document.getElementById('delBtn').addEventListener('click', function (e) {
    document.getElementById('create_pdf').className = "btn btn-success btn-lg d-none"
    varContent = []
    if (document.querySelectorAll){
        var clsElements = document.querySelectorAll(".variable");
        clsElements.forEach(element => {
            element.value = ""
            // console.log(varContent);
        })}
        document.getElementById('myBtn').className = "btn btn-primary btn-lg"
})
