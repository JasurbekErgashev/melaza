const Rating = {
    render: (props) => {
        if(!props.value){
            return "<div></div>";
        }
        return `
        <div class="rating">
            <div>
               <span>
                    <i class="${props.value >= 1 ? "bi bi-star-fill" : props.value >= 0.5 ? "bi bi-star-half" : "bi bi-star"}"></i>
               </span>
               <span>
                    <i class="${props.value >= 2 ? "bi bi-star-fill" : props.value >= 1.5 ? "bi bi-star-half" : "bi bi-star"}"></i>
               </span>
               <span>
                    <i class="${props.value >= 3 ? "bi bi-star-fill" : props.value >= 2.5 ? "bi bi-star-half" : "bi bi-star"}"></i>
               </span>
               <span>
                    <i class="${props.value >= 4 ? "bi bi-star-fill" : props.value >= 3.5 ? "bi bi-star-half" : "bi bi-star"}"></i>
               </span>
               <span>
                    <i class="${props.value >= 5 ? "bi bi-star-fill" : props.value >= 4.5 ? "bi bi-star-half" : "bi bi-star"}"></i>
               </span>
            </div>
            <span class="review">
                ${props.text || ""}
            </span>
        </div>
        `;
    },
};
export default Rating;