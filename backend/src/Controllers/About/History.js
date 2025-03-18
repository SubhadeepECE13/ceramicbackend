import exp from "constants";
import History from "../../Model/Aboutpage/HistoryModel.js";

export const Histroy=async(req , res)=>{
    try{
        const {date, description}=req.body;
        console.log(date)
        if(!date || !description)
        {
            return res.status(401).json({
                message:'Fill all the field'
            })
        }
       
         const created =await History.create({
            date: date,
            description: description
         })
         if(created)
         {
            return res.status(201).json({
                message:'Created Successfully',
                created,
                success:true
            })
         }
         return res.status(401).json({
            message:'Can not create',
            success:false
         })

    }catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false
            
        })
    }
}


export const getallHistory=async(req,res)=>{
    try{
        const getall=await History.find({});
        if(!getall)
        {
            return res.status(404).json({
                message:'Can not get history'
            })
        }
        return res.status(201).json(getall);

    }catch(error)
    {
     return res.status(501).json({
        message:'Internal server error',
        success:false
     })
    }
}
export const EditHistory = async (req, res) => {
    try {
        const id = req.params.id;
        const { date, description } = req.body;

        if (!id) {
            return res.status(400).json({
                message: 'No ID provided'
            });
        }

        const history = await History.findById(id);
        if (!history) {
            return res.status(404).json({
                message: 'Cannot find history with this ID',
                success: false
            });
        }

        const updatedHistory = await History.findByIdAndUpdate(
            history._id,
            { date, description },
            { new: true }
        );

        return res.status(200).json({
            message: 'History updated successfully',
            success: true,
            data: updatedHistory
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server error',
            success: false
        });
    }
};

export const  DeleteHistory=async(req, res)=>
{
    try{
        
        const id=req.params.id;
        console.log('id',id)
        const his=await History.findById(id);
        if(!his)
        {
            return res.status(404).json({
                message:'Can not find with this id',
                success:false
            })
        }
        const deleted=await History.findByIdAndDelete(id);
        if(!deleted)
        {
            return res.status(501).json({
                message:'Can not  deleted '
            })
        }
        return res.status(201).json({
            message:'Deleted successfully',
            success:true
        })

    }catch(error)
    {

        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}
