const postData = () => {
    console.log('post data');
    const make = document.getElementById('make').value;
    const mileage = document.getElementById('mileage').value;
    const model = document.getElementById('model').value;
    const type = document.getElementById('type').value;
    const regnumber = document.getElementById('regnumber').value;
    const wheeltype = document.getElementById('wheeltype').value;
    console.log(wheeltype);
    const data =  {
        make,model,mileage,type,regnumber,wheeltype
    };
    console.log('-----')
    console.log(data);
    document.getElementById('make').value='';
    document.getElementById('mileage').value='';
    document.getElementById('model').value='';
    document.getElementById('regnumber').value='';
    alert("Record added. Look up with registration number");
    console.log(data);
    fetch('http://localhost:3000/user_create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

      })
      .then((res) => res.json())
      .then((response) => {
        console.log('Request succeeded with JSON response', response);
      })
      .catch((error) => {
        console.log('Request failed', error);
      });
    
    
}