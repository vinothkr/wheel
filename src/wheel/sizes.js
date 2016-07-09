module.exports = {
    int16 : 2,
    int32 : 4,
    string : (value) => 2 + value.length,
    bytes : (value) => 4 + value.length
};
