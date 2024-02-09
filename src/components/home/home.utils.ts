const ROWSPERPAGEARRAY=[10,25,50];
const TOTALDEFAULTSELECTEDROWCOUNT=5;
const DEFAULTROWSPERPAGE=10;

type Order = 'asc' | 'desc';

interface Data {
    id: number;
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
  }
  
interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
  }

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }
  
  interface EnhancedTableToolbarProps {
    numSelected: number;
  }

  interface Data {
  id: number;
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface GraphPlot{
    x:string[],
    y:number[],
    name:string,
    type:string,
    marker:{
      color:string
    }
}

const generatebargraphdata=(selectedid:readonly number[], rows:Data[],metrics:any)=>{
  let selecteddesserts:string[]=[]
  let selecteddesertcalories:number[]=[],selecteddesertfats:number[]=[],
  selecteddesertcarbs:number[]=[],selecteddesertproteins:number[]=[];

  let graphrelateddata=rows.filter((g)=>{
    if(selectedid.includes(g.id)){
      selecteddesserts.push(g.name);
      selecteddesertcalories.push(g.calories)
      selecteddesertfats.push(g.fat)
      selecteddesertcarbs.push(g.carbs)
      selecteddesertproteins.push(g.protein)
      return true;
    }
    return false;
  });

  var trace1:GraphPlot= {
    x: selecteddesserts,
    y: selecteddesertcalories,
    name: 'Calories',
    type: 'bar',
    marker: {
      color: '#0000CC'
    }
  };
  
  var trace2:GraphPlot = {
    x: selecteddesserts,
    y: selecteddesertfats,
    name: 'Fat (g)',
    type: 'bar',
    marker: {
      color: '#FFFF00'
    }
  };

  var trace3:GraphPlot= {
    x: selecteddesserts,
    y: selecteddesertcarbs,
    name: 'Carbs (g)',
    type: 'bar',
    marker: {
      color: '#606060'
    }
  };
  
  var trace4:GraphPlot= {
    x: selecteddesserts,
    y: selecteddesertproteins,
    name: 'Protein (g)',
    type: 'bar',
    marker: {
      color: '#FF33FF'
    }
  };

  let data:GraphPlot[]=[];
  if(metrics["calories"]){
    data.push(trace1)
  }

  if(metrics["fat"]){
    data.push(trace2)
  }

  if(metrics["carbs"]){
    data.push(trace3)
  }

  if(metrics["protein"]){
    data.push(trace4)
  }
  const response= {
    data,
  }
  return response;
}

export { descendingComparator, getComparator, stableSort, generatebargraphdata,ROWSPERPAGEARRAY,TOTALDEFAULTSELECTEDROWCOUNT,DEFAULTROWSPERPAGE};
export type { Order, Data, HeadCell, EnhancedTableProps, EnhancedTableToolbarProps,GraphPlot};
