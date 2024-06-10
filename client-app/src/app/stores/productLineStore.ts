import { makeAutoObservable, runInAction } from "mobx";
import { ProductLine } from "../models/productLine";
import agent from "../api/agent";
import { statusOption } from "../common/options/statusOptions";
import { SemanticCOLORS } from "semantic-ui-react";
import { v4 as uuid } from 'uuid';

export default class ProductLineStore {

    constructor() {
        makeAutoObservable(this);

    }

    loadingInitial = false;
    productLines = new Map<string, ProductLine>();
    choosingLine: ProductLine | null = null;



    loadProductLines = async () => {
        this.setInitialLoading(true);

        try {
            const productLines = await agent.ProductLines.list();

            runInAction(() => {
                productLines.forEach(productLine => {
                    this.setProductLine(productLine)
                })

                if (this.choosingLine == undefined) {
                    this.setChoosingLine(productLines[0])
                }
            })
            this.setInitialLoading(false);
        } catch (error) {
            this.setInitialLoading(false);
        }
    }
    private extractNumber = (line: string): number => {
        const match = line.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      };

    get productLineByStatus() {
        return Array.from(this.productLines.values())
            .sort((a, b) =>this.extractNumber(a.title) - this.extractNumber(b.title));
    }

    get groupedLineStatus() {
        return Object.entries(
            this.productLineByStatus.reduce((productLines, productLine) => {
                const status = productLine.status
                productLines[status] = productLines[status] ? [...productLines[status], productLine] : [productLine];
                return productLines;
            }, {} as { [key: string]: ProductLine[] })

        )
    }

    setProductLine(productLine: ProductLine) {
        this.productLines.set(productLine.id, productLine)
    }

    setInitialLoading(flag: boolean) {
        this.loadingInitial = flag;
    }

    setChoosingLine = (productLine: ProductLine) => {
        runInAction(() => {
            this.choosingLine = productLine;
        })
    }

    getStatusColor = (status: string) => {
        const option = statusOption.find((opt) => opt.text === status);
        return option ? option.value : 'black';
    };

    mapToSemanticColor = (color: string): SemanticCOLORS => {
        const semanticColors: SemanticCOLORS[] = [
            'red', 'orange', 'yellow', 'olive', 'green', 'teal',
            'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
        ];
        return semanticColors.includes(color as SemanticCOLORS) ? (color as SemanticCOLORS) : 'black';
    };

    createProductLine = async (productLine: ProductLine) => {
        this.setInitialLoading(true);
        productLine.id = uuid();
        try {
            await agent.ProductLines.create(productLine);
            runInAction(() => {
                this.productLines.set(productLine.id, productLine)
                this.setInitialLoading(false);
            })
        } catch (error) {
            runInAction(() => {
                this.setInitialLoading(false);
            })
        }
    }

    updateProductLine = async (productLine: ProductLine) => {
        this.setInitialLoading(true);
        try {
            await agent.ProductLines.update(productLine);
            runInAction(() => {
                this.productLines.set(productLine.id, productLine);
                this.setInitialLoading(false);
            })
        } catch (error) {
            runInAction(() => {
                this.setInitialLoading(false);
            })
        }
    }
    deleteProductLine = async (id: string) => {
        this.setInitialLoading(true);
        try {
            await agent.ProductLines.delete(id);
            runInAction(() => {
                this.productLines.delete(id);
                this.setInitialLoading(false);
            })
        } catch (error) {
            runInAction(() => {
                this.setInitialLoading(false);
            })
        }
    }
}