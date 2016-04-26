var encryptbutton = document.getElementById('encrypt');
var decryptbutton = document.getElementById('decrypt');

function str2ab(str)
{
    var ab = new Uint8Array(str.length);
    for (var iii = 0; iii < str.length; iii++)
    {
        ab[iii] = str.charCodeAt(iii);
    }

    return ab;
}  

function ab2str(buf)
{
    var str = "";
    for (var iii = 0; iii < buf.byteLength; iii++)
    {
        str += String.fromCharCode(buf[iii]);
    }

    return str;
}



var crypto = window.crypto || window.msCrypto;

var global_key = null;

var promise_key = null;

var data = null;

encryptbutton.addEventListener('click', function(){
	data = document.getElementById('password').value;
  
  if(crypto.subtle)
    {

        promise_key = crypto.subtle.generateKey({name: "AES-CBC", length: 128}, false, ["encrypt", "decrypt"]);

        promise_key.then(function(key){
            global_key = key;
            encrypt();
        });

        promise_key.catch = function(error){
            console.log(error.message);
        }
    }
    else
    {
        alert("ERROR");
    }
});

var encrypted = null;
var encrypt_promise = null;

var aux = crypto.getRandomValues(new Uint8Array(16));           

var decrypt_promise = null;
var decrypted = null;



function encrypt()
{
    encrypt_promise = crypto.subtle.encrypt({name: "AES-CBC", iv: aux}, global_key, str2ab(data));

    encrypt_promise.then(
        function(result){
            encrypted = new Uint8Array(result);
            var p1 = document.getElementById('p1');
            p1.innerHTML = 'Encrypted Information: ' + ab2str(encrypted);
            console.log(ab2str(encrypted));
            decrypt();
        },
        function(error){
            console.log(error.message);
        }
    );
}

function decrypt()
{
    decrypt_promise = crypto.subtle.decrypt({name: "AES-CBC", iv: aux}, global_key, encrypted);

    decrypt_promise.then(
        function(result){
            decrypted = new Uint8Array(result);
            var p2 = document.getElementById('p2');
            p2.innerHTML = 'Decrypted Information: ' + ab2str(decrypted);
            console.log(ab2str(decrypted));
        },
        function(error){
            console.log(error.message);
        }
    );
}