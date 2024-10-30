const cars = [{type: "Fiat", model: "500", color: "white"}];
const options = {params: ['type', 'color'], values: ['Fiat', 'White']};
const keys = options['params'];
const values = options['values'];

const all = cars.filter(item => 
    keys.every((key, index) => 
        String(item[key]).toLowerCase().includes(String(values[index]).toLowerCase())
    )
);

console.log("🚀 ~ keys:", keys);
console.log("🚀 ~ values:", values);
console.log("🚀 ~ all:", all);  // Expected output: []
