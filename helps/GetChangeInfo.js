const infoToChange = (object) => {
    const info = {};
    Object.keys(object).forEach((key) => {
        if (key !== "_id") {
            info[key] = object[key];
        }
    });
    return info;
};

module.exports = {
    infoToChange,
};