
import { Button } from "reactstrap";
import { ProductLine } from "../../../../../app/models/productLine"
import { ListItem } from "@mui/material";
import { useStore } from "../../../../../app/stores/store";
import { Button as SemanticButton } from "semantic-ui-react";

interface Props {
    productLine: ProductLine;
    handleChoosingLine: (productLine: ProductLine) => void;
    getStatusColor: (color: string) => string;
    handleStatusClick: (e: React.MouseEvent<HTMLElement>, productLine: ProductLine) => void;
}

export default function ProductLineListItem({ productLine, handleChoosingLine, getStatusColor, handleStatusClick }: Props) {
    const { productLineStore } = useStore();

    const { choosingLine, deleteProductLine } = productLineStore;

    const handleDelete = (id: string) => {
        deleteProductLine(id);
    }
    return (
        <ListItem key={productLine.id}>
            <Button 
                variant="contained"
                color={productLine.id === choosingLine!.id ? 'primary' : 'default'}
                onClick={() => handleChoosingLine(productLine)}
                style={{ width: 500 }}
                fullWidth
            >
                {productLine.title}<br />
                <span style={{ color: getStatusColor(productLine.status), cursor: "pointer", display: 'inline' }}
                    onClick={(e) => handleStatusClick(e, productLine)}
                >
                    {productLine.status}
                </span>
                
            </Button>
            <SemanticButton
                    floated="right"
                    loading={productLineStore.loadingInitial}
                    icon='delete' size="mini"
                    secondary onClick={() => handleDelete(productLine.id)}
                />
        </ListItem>
    )
}