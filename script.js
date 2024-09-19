const number=document.querySelector("[slidermove");
const prevnumber=document.querySelector("[passwordlengthnumber]");
const displaycopymsg=document.querySelector("[displaycopy]");
let copyBtn = document.querySelector("[copyBtn]");
const displaypassword=document.querySelector("[passworddisplay]");
const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#specialcharacter');
const indicator=document.querySelector('#showstrength');
const generate=document.querySelector("[generatenow]");
let slider = document.querySelector('input[type=range]');
let checkBoxes = document.querySelectorAll("input[type=checkbox]");

let password="";
let passwordlength=10;
let checkcount=0;
let symbolslist='!@#$%^&*()_+}=-{|:?><~`/.,\;]["}"';

// function to handlle the slider and get the number to choose the length of the password
handleslider();
function handleslider(){
    number.value=passwordlength;
    prevnumber.innerText=passwordlength;
};

function setindicator(color){
    indicator.style.backgroundColor=color;
}

function getrandomnumber1(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
function getrandomnumber(){
    return getrandomnumber1(0,9);
};

function getrandomlowercase(){
    return String.fromCharCode(getrandomnumber1(97,123));
};

function getrandomuppercase(){
    return String.fromCharCode(getrandomnumber1(65,91));
};

function getrandomsymbol(){
    return symbolslist.charAt(getrandomnumber1(0,30));
};

function calculatestrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNumber = true;
    if (symbols.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordlength >= 8) {
        setindicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordlength >= 6
    ) {
        setindicator("#ff0");
    } else {
        setindicator("#f00");
    }
};
async function copycontent (){
    try{
        await navigator.clipboard.writeText(displaypassword.value);
        displaycopymsg.innerText="Copied";
    }
    catch(e){
        displaycopymsg.innerText="Failed";
    }
    displaycopy.classList.add("active");
    setTimeout(() => {
        displaycopy.classList.remove("active");
    }, 2000);
}

slider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handleslider();

})

copyBtn.addEventListener('click',()=>{
    if(displaypassword.value)
    copycontent();
})
function handleCheckBoxChange() {
    checkCount = 0;
    checkBoxes.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    });

    //special condition
    if (passwordlength < checkcount) {
        passwordlength = checkcount;
        handleslider();
    }
}

checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})
generate.addEventListener('click',()=>{
    console.log("yhha to aa gya")
    // if no checkbox is ticked then no password will be generated means go to your home back or set another values.
    // if(checkcount<=0) return;
    if(passwordlength<checkcount){
        checkcount=passwordlength;
        handleslider();
    }
    console.log("yha to aa gya")
    //lets start the journey to find the password

    password="";
    // if(uppercase.checked) password+=getrandomuppercase;
    // if(lowercase.checked) password+=getrandomlowercase;
    // if(numbers.checked) password+=getrandomnumber;
    // if(symbols.checked) password+=getrandomsymbol;
    

    let arr=[];
    if(uppercase.checked) arr.push(getrandomuppercase);
    if(lowercase.checked) arr.push(getrandomlowercase);
    if(numbers.checked) arr.push(getrandomnumber);
    if(symbols.checked) arr.push(getrandomsymbol);

    for(let i=0;i<arr.length;i++){
        password+=arr[i]();
    }
    for (let i = 0; i < passwordlength - arr.length; i++) {
        let randIndex = getrandomnumber1(0,arr.length);
        password += arr[randIndex]();
    }
    function shufflepassword(array){
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        let str = "";
        array.forEach((el) => (str += el));
        return str;
    }
    console.log("yha bhi aa gya")
    console.log(password)
    displaypassword.value=password;
    calculatestrength();
})