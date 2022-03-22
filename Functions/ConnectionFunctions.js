module.exports = {
    execute(val) {
        var status = " ";
        switch(val) {
            case 0 : status = `🔴 DISCONNECTED!`
            break;
            case 1 : status = `🟢 CONNECTED!`
            break;
            case 2 : status = `🟠 CONNECTING!`
            break;
            case 3 : status = `🟣 DISCONNECTING!`
            break;
        }

        return status;
    }
}