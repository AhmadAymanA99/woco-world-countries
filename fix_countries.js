const fs = require('fs');

// Read the current Arabic countries file
let data = fs.readFileSync('D:\\new\\woco\\data\\ar\\countries.json', 'utf8');

// Parse it
let countries = JSON.parse(data);

// Fix the specific countries
countries['Cabo Verde'] = 'الرأس الأخضر';
countries['Eswatini'] = 'إسواتيني';
countries['Sao Tome and Principe'] = 'ساو تومي وبرينسيب';

// Write back to file
fs.writeFileSync('D:\\new\\woco\\data\\ar\\countries.json', JSON.stringify(countries, null, 2));
console.log('Fixed the three country names in Arabic translation');