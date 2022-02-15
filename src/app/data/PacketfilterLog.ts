export interface PacketfilterLog{
  id: string,
  timestamp: string
  created: string,
  severity: string,
  sys: string,
  sub: string,
  name: string,
  action: string,
  fwrule: string,
  initf: string,
  outitf: string
  srcport: string
  dstport: string
  tcpflags: string
  srcmac: string
  dstmac: string
  srcip: string
  dstip: string
  proto: string
  length: string
  tos: string
  prec: string
  ttl: string
}
