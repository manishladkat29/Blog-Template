function checkbox(id){
    console.log(id);
    var checkbox = document.querySelector('input[id="'+ id +'"]');
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            console.log("checked");
            fetch('/post_status_change?id=' + id +'&status=checked', {method: 'POST'})
                .then(function(response) {
                    if(response.ok) {
                        return;
                    }
                    throw new Error('Request failed.');
                })
                .catch(function(error) {
                    console.log(error);
                });
        } else {
            console.log("unchecked");
            fetch('/post_status_change?id=' + id +'&status=unchecked', {method: 'POST'})
                .then(function(response) {
                    if(response.ok) {
                        console.log('click was recorded');
                        return;
                    }
                    throw new Error('Request failed.');
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    });
}