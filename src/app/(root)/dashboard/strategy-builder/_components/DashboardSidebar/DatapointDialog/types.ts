
// API Types
export interface ApiResponse<T> {
  status: boolean;
  error: boolean;
  message: string;
  data: T;
}

export interface SymbolData {
  exchange: string;
}

export interface ExecutionSettings {
  orderType: string[];
  productType: string[];
}

export interface OptExp {
  weekly?: number[];
  monthly: number[];
}

export interface SymbolInfo {
  exchange: string;
  isWeekly: boolean;
  OptExp: OptExp;
  FutExp: {
    monthly: number[];
  };
  tickSize: number;
  executionSettings: ExecutionSettings;
  symbol: string;
  timeFrame: number[];
  segments:DataType[];
  "data-available": DataType[];
}

// Data Point Types
export type DataType = "SPOT" | "FUT" | "OPT";
export type SelectedOption = "candle-data" | "days-to-expire" | null;
export type StrikeMode = "strike"
export type StrikePosition = "atm" | `itm${number}` | `otm${number}`;

export interface StrikeSelection {
  mode: StrikeMode;
  position: StrikePosition;
}

export interface DataPointOption {
  applyIndicators: boolean;
  candleLocation: boolean;
  type: string // "candleData" | "dte" | "candleTime";
  columnsAvailable: string[];
  canComparedwith: string[] //['candleData' , 'values' ,'indicators']
}

export interface DataPoint {
  id: string;
  type: "candle-data" | "days-to-expire";
  elementName: string;
  dataType?: DataType;
  optionType?:"CE" | "PE"
  candleType?: string;
  duration?: string;
  expiryType?: string;
  expiryOrder?: string;
  strikeSelection?: StrikeSelection;
  options?: DataPointOption
}

export interface DataPointsStore {
  dataPoints: DataPoint[];
  setDataPoints: (dataPoints: DataPoint[]) => void;
  addDataPoint: (dataPoint: DataPoint) => void;
  removeDataPoint: (id: string) => void;
  updateDataPoint: (id: string, dataPoint: Partial<DataPoint>) => void;
  clearDataPoints: () => void;
}

export interface DataPointDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingDataPoint?: DataPoint;
}

export interface CandleDataFormProps {
  initialData?: DataPoint;
  onSave: (data: {
    elementName: string;
    dataType?: DataType;
    candleType?: string;
    duration?: string;
    expiryType?: string;
    expiryOrder?: string;
    strikeSelection?: StrikeSelection;
  }) => void;
  onClose?: () => void;
}

export interface DaysToExpireProps {
  initialData?: DataPoint;
  onSave: (data: {
    elementName: string;
    expiryType?: string;
    expiryOrder?: string;
  }) => void;
  onClose?: () => void;
}