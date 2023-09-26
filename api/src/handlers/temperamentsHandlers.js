const{ getTemperaments, /* giveMeAllTemperaments */}= require('../controllers/temperamentsControllers')



const saveTemperamentsHandler = async (req, res)  => {
try{
    const response = await getTemperaments();
    res.status(200).json(response);
    
}
catch (error) {
    res.status(400).json({error:error.message})
}
}



/* const giveMeAllTemperamentsHandler = async (req,res) =>{
    try {
        const response = await giveMeAllTemperaments();
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
} */


module.exports = {saveTemperamentsHandler,/* giveMeAllTemperamentsHandler */};