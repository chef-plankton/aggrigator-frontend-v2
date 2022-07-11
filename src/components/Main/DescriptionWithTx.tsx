import { getBscScanLink } from "../../utils";
import truncateHash from "../../utils/truncateHash";

interface DescriptionWithTxProps {
  description?: string;
  txHash?: string;
}

const DescriptionWithTx: React.FC<DescriptionWithTxProps> = ({ txHash }) => {
  return (
    <>
      {txHash && (
        <a href={getBscScanLink(txHash, "transaction")}>
          {"View on BscScan"}: {truncateHash(txHash, 8, 0)}
        </a>
      )}
    </>
  );
};

export default DescriptionWithTx;
