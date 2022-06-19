export interface AuthResponse {
    userResponse: {
        statusDescription: string
        statusCode: number
        data: Data
      }
}

export interface Data {
    userIndex: number
    userId: string
    firstName: string
    lastName: string
    providedUserId: string
    cooperativeIndex: string
    cooperativeId: string
    emailAddress: string
    phoneNumber: string
    role: string
    section: Section
    region: any
    walletBalance: string
    transactions: Transaction[]
    channels: Channel[]
    bankAccount: any
    logos: Logo[]
    token: string
  }
  
  export interface Section {
    id: number
    sectionName: string
    sectionLat: any
    sectionLong: any
  }
  
  export interface Transaction {
    id: number
    datecreated: string
    walletTransactionType: string
    sendorPhoneNumber: string
    recipientPhoneNumber: string
    transMode: string
    status: boolean
    reasons: string
    amount: string
    recipientName: string
    sendorName: string
    transactionCode: string
  }
  
  export interface Channel {
    id: number
    channelName: string
    abbreviation: string
    type: string
  }
  
  export interface Logo {
    id: number
    logoname: string
    path: string
  }





