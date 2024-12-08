# Rest API - Docs

API Root:
> https://poker-trade.com/api

Media Root:
> https://poker-trade.com/media

### GET /user
> Authorization: Bearer \<token\>

Response:
```json
{
  "nickname": "test",
  "email": "test@gmail.com",
  "verified": true,
  "balance": 15
}
```
### GET /poker-rooms
Response:
```json
[
  {
    "id": 124423,
    "title": "ПокерОК",
    "imageUrl": "pokerok.png"
  }
]
```
### GET /currencies/\<pokerRoomId\>
Response:
```json
[
  {
    "id": 124423,
    "title": "RUB",
    "rateMin": 90.0,
    "rateMax": 120.0
  }
]
```
### GET /banks/\<currencyId\>
Response:
```json
[
  {
    "id": 124423,
    "title": "Сбербанк",
    "imgUrl": "sberbank.png",
    "isSbp": true,
    "sbpBanksUrl": "/sbp"
  }
]
```
### GET /existing-banks/\<pokerRoomId\>/\<currencyId\>
`Только банки, на которые есть заявки на продажу`

Response:
```json
[
  {
    "id": 124423,
    "title": "Сбербанк",
    "imgUrl": "sberbank.png",
    "isSbp": true,
    "sbpBanksUrl": "/sbp"
  }
]
```
### POST /sell-requests
> Authorization: Bearer \<token\>

Request:
```json
{
  "pokerRoomId": 3245234,
  "currencyId": 123123123,
  "page": 0,
  "size": 10,
  "sortField": "currencyRate",
  "sortDirection": "desc",
  "filterField": "bank",
  "filterValue": "Сбербанк"
}
```
Response:
```json
{
    "my": [
        {
            "bankImageUrl": "kaspi.svg",
            "bankName": "КазахБанк",
            "currencyRate": 110.0,
            "id": 18,
            "minToSellUSD": 5.0,
            "nickname": "zerdicorp",
            "wantToSellUSD": 96.0
        }
    ],
    "other": [...],
    "total": 1
}
```
### POST /sell-request
> Authorization: Bearer \<token\>

Request:
```json
{
    "pokerRoomId": 45646456,
    "currencyId": 2342344,
    "wantToSellUSD": 450.00,
    "minToSellUSD": 100.00,
    "currencyRate": 113.00,
    "bankId": 3453455354,
    "byNumberBank": null, // тут будет название банка если bankId принадлежит СБП
    "detailsValue": "2200124272836456",
    "fullName": "Аникин Николай Николаевич",
    "additionalInfo": null // просто строка с доп инфой
}
```
Response:
```json
{
  "sellRequestId": 38422
}
```
### POST /sell-request/to-moderation
> Authorization: Bearer \<token\>

```json
{
  "sellRequestId": 123414,
  "pokerRoomNickname": "test"
}
```
### POST /sell-request/cancel
> Authorization: Bearer \<token\>

```json
{
  "sellRequestId": 123414
}
```
### GET /sell-request/updates/\<id\>
> Authorization: Bearer \<token\>

Response:
```json
{
  "status": "moderation"
}
```
### GET /sell-request/\<id\>
> Authorization: Bearer \<token\>

Response:
```json
{
  "createdAt": "2024.10.11 18:19",
  "currencyRate": 113.00,
  "currencyName": "RUB",
  "bankName": "Сбербанк",
  "fullName": "Аникин Николай",
  "pokerRoomName": "ПокерОК",
  "wantToSellUSD": 500.00,
  "adminProfitUSD": 13.00,
  "detailsValue": "2200124272836456",
  "soldUSD": 0.00,
  "received": 0.00,
  "status": "MODERATION"
}
```
### GET /buy-requests/\<sellRequestId\>
> Authorization: Bearer \<token\>

Response:
```json
[
  {
    "id": 12313,
    "totalToGive": 100.00,
    "currencyName": "RUB",
    "wantToBuyUSD": 24.01,
    "createdAt": "2024.08.12 10:30",
    "buyerFullName": "Андрей Ш",
    "buyerLastFourDig": "1234",
    "status": "wait-for-payed-approve"
  }
]
```

### POST /buy-request
> Authorization: Bearer \<token\>

Request:
```json
{
  "sellRequestId": 3252344,
  "wantToBuyUSD": 450.00,
  "pokerRoomNickname": "test"
}
```
Response:
```json
{
  "buyRequestId": 3463455
}
```
### GET /buy-request/updates/\<id\>
> Authorization: Bearer \<token\>

Response:
```json
{
  "status": "wait-for-seller-approve",
  "chat": [
    {
      "senderName": "test",
      "senderRole": "buyer",
      "msgType": "text",
      "msgValue": "где тенге любовски",
      "sentAt": "2024.10.11 18:35"
    },
    {
      "senderName": "test2",
      "senderRole": "seller",
      "msgType": "text",
      "msgValue": "пошел в пизду",
      "sentAt": "2024.10.11 18:35"
    }
  ]
}
```
### GET /buy-request/\<id\>
> Authorization: Bearer \<token\>

Response:
```json
{
  "createdAt": "2024.10.11 18:19",
  "sellRequestId": 4563435,
  "currencyRate": 113.00,
  "currencyName": "RUB",
  "sellerNickname": "test",
  "bankName": "Сбербанк",
  "sellerFullName": "Аникин Н",
  "pokerRoomName": "ПокерОК",
  "pokerRoomNickname": "test",
  "wantToBuyUSD": 450.00,
  "detailsType": "card",
  "detailsValue": "2200124272836456"
}
```
### POST /buy-request/i-payed
> Authorization: Bearer \<token\>

Request:
```json
{
  "buyRequestId": 54674566,
  "bayerFullName": "Андрей Андреевич Швецов",
  "lastFourDig": "7685"
}
```
### POST /buy-request/cancel
> Authorization: Bearer \<token\>

Request:
```json
{
  "buyRequestId": 56456467
}
```
### POST /chat-message
> Authorization: Bearer \<token\>

```json
{
  "buyRequestId": 56834565,
  "msgType": "text",
  "msgValue": "ало лох"
}
```
### POST /set-nickname
> Authorization: Bearer \<token\>

Request:
```json
{
  "nickname": "test"
}
```
### POST /set-email
> Authorization: Bearer \<token\>

Request:
```json
{
  "email": "test@gmail.com"
}
```
### POST /verify-email
> Authorization: Bearer \<token\>

Request:
```json
{
  "code": "12423"
}
```
### GET /sbp
> Authorization: Bearer \<token\>

Response:
```json
[
  "ТБанк",
  "Аллах-Акбар Банк",
  "Мама Андрея Умерла Банк"
]
```
### POST /ping
> Authorization: Bearer \<token\>

Request:
```json
{
  "key": "sell-request",
  "value": "123213"
}
```
