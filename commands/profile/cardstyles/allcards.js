module.exports = {
    getcards : () => {
        
        const list = [
            require("./comic.json"),
            require("./default.json"),
            require("./sunshine.json"),
            require("./koleka.json"),
        ]
        return list;
    }
};