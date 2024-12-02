// apiService.ts

interface SuiObject {
  description: string;
  name: string;
  ipfs_hash: string;
  rem_shares: string;
  risk_coverage: string;
  total_shares: string;
  collateral: {
    fields: {
      balance: string;
    };
  };
}

interface SuiResponse {
  jsonrpc: string;
  result: Array<{
    data: {
      content: {
        fields: SuiObject;
      };
    };
  }>;
}

const DEFAULT_VALUES = {
  description: "No description available",
  name: "Unnamed Event",
  ipfs_hash: "",
  rem_shares: "0",
  risk_coverage: "0",
  total_shares: "0",
  collateral: {
    fields: {
      balance: "0",
    },
  },
};

export const fetchSuiObject = async (objectId: string): Promise<SuiObject> => {
  try {
    const response = await fetch("https://fullnode.testnet.sui.io:443", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "sui_multiGetObjects",
        params: [
          [objectId],
          {
            showBcs: false,
            showContent: true,
            showDisplay: false,
            showOwner: false,
            showPreviousTransaction: false,
            showStorageRebate: false,
            showType: false,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as SuiResponse;

    if (!data.result?.[0]?.data?.content?.fields) {
      return DEFAULT_VALUES;
    }

    const fields = data.result[0].data.content.fields;

    return {
      description: fields.description ?? DEFAULT_VALUES.description,
      name: fields.name ?? DEFAULT_VALUES.name,
      ipfs_hash: fields.ipfs_hash ?? DEFAULT_VALUES.ipfs_hash,
      rem_shares: fields.rem_shares ?? DEFAULT_VALUES.rem_shares,
      risk_coverage: fields.risk_coverage ?? DEFAULT_VALUES.risk_coverage,
      total_shares: fields.total_shares ?? DEFAULT_VALUES.total_shares,
      collateral: {
        fields: {
          balance:
            fields.collateral?.fields?.balance ??
            DEFAULT_VALUES.collateral.fields.balance,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching Sui object:", error);
    return DEFAULT_VALUES;
  }
};
