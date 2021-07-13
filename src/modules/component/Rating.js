import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export default function Rating (props) {
    const {rate} = props
    return (
        <> 
            <StarIcon color="secondary" fontSize="small"/>
            {rate >= 1.9 ? <StarIcon color="secondary" fontSize="small"/> : rate >= 1.5 && rate < 1.9 ? <StarHalfIcon color="secondary" fontSize="small"/> : <StarBorderIcon color="disabled" fontSize="small"/>}
            {rate >= 2.9 ? <StarIcon color="secondary" fontSize="small"/> : rate >= 2.5 && rate < 2.9 ? <StarHalfIcon color="secondary" fontSize="small"/> : <StarBorderIcon color="disabled" fontSize="small"/>}
            {rate >= 3.9 ? <StarIcon color="secondary" fontSize="small"/> : rate >= 3.5 && rate < 3.9 ? <StarHalfIcon color="secondary" fontSize="small"/> : <StarBorderIcon color="disabled" fontSize="small"/>}
            {rate >= 4.9 ? <StarIcon color="secondary" fontSize="small"/> : rate >= 4.5 && rate < 4.9 ? <StarHalfIcon color="secondary" fontSize="small"/> : <StarBorderIcon color="disabled" fontSize="small"/>}
        </>
    )
}