declare module "aws-lambda-stream" {
  // Always required
  interface Rule {
    id: string;
    flavor: Flavor;
    eventType: string | string[] | Function;
  }

  // Flavors

  interface CollectRule extends Rule {}
  interface CorrelateRule extends Rule {}
  interface CdcRule extends Rule {}
  interface ExpiredRule extends Rule {}
  interface JobRule extends Rule {}
  interface MaterializeRule extends Rule {}
  interface MaterializeS3Rule extends Rule {}
  interface SendMessagesRule extends Rule {}
  interface UpdateRule extends Rule {}

  export type Flavor = (rule: Rule) => (s: any) => any;

  export function collect(rule: CollectRule): (s: any) => any;
  export function correlate(rule: CorrelateRule): (s: any) => any;
  export function cdc(rule: CdcRule): (s: any) => any;
  export function expired(rule: ExpiredRule): (s: any) => any;
  export function job(rule: JobRule): (s: any) => any;
  export function materialize(rule: MaterializeRule): (s: any) => any;
  export function materializeS3(rule: MaterializeS3Rule): (s: any) => any;
  export function sendMessages(rule: SendMessagesRule): (s: any) => any;
  export function update(rule: UpdateRule): (s: any) => any;

  // Connectors
  export class CloudWatchConnector {
    constructor({ debug: any, timeout: number });
    public put({ Namespace: any, MetricData: any }): any;
  }
  // fixme
  export class DynamoDBConnector {}
  export class EventBridgeConnector {}
  export class FetchConnector {}
  export class FirehoseConnector {}
  export class KinesisConnector {}
  export class LambdaConnector {}
  export class SecretsMgrConnector {}
  export class S3Connector {}
  export class SnsConnector {}
  export class SqsConnector {}

  // Faults
  export function faults(err: any, push: any): void;

  // Filters
  export interface UnitOfWork {
    record: any;
    event?: Event;
    batch?: UnitOfWork[];
  }

  export function filterOnEventType(rule: any, uow: any): any;

  export function prefilterOnEventTypes(rules: any): (uow: any) => any;

  export function filterOnContent(rule: any, uow: any): any;

  export function outSourceIsSelf(uow: any): boolean;

  export function outLatched(uow: any): any;

  export function skipTag(): {
    skip: boolean | undefined;
  };

  export function outSkip(uow: any): boolean;

  // From

  export function fromCron(event: any): Highland.Stream<{
    record: any;
    event: any;
  }>;

  export function fromCognito(
    event: any,
    params?: {
      eventTypePrefix?: string | undefined;
    }
  ): Highland.Stream<any>;

  export function fromDynamodb(
    event: any,
    params?: {
      pkFn?: string | undefined;
      skFn?: string | undefined;
      discriminatorFn?: string | undefined;
      eventTypePrefix?: undefined;
    }
  ): Highland.Stream<any>;

  export function outReplicas(record: any): boolean;

  export function outGlobalTableExtraModify(record: any): boolean;

  //   const toDynamodbRecords: (events: any) => {
  //     Records: any;
  //   };
  //   const UNKNOWN_DYNAMODB_EVENT_TYPE: {
  //     Records: any;
  //   };

  //   const fromEventBridge: (event: any) => Highland.Stream<any>;

  //   const toEventBridgeRecord: (event: any) => {
  //     version: string;
  //     id: string;
  //     source: string;
  //     region: string;
  //     "detail-type": any;
  //     detail: any;
  //   };

  //   const fromKinesis: (event: any) => any;

  //   const toKinesisRecords: (events: any) => {
  //     Records: any;
  //   };

  //   const UNKNOWN_KINESIS_EVENT_TYPE: {
  //     Records: any;
  //   };

  //   const fromS3: (event: any) => Highland.Stream<{
  //     record: any;
  //   }>;

  //   const fromSqsSnsS3: (event: any) => Highland.Stream<{
  //     record: {
  //       s3: any;
  //       sns: any;
  //       sqs: any;
  //     };
  //   }>;

  //   const fromS3Event: (event: any, options?: {}) => any;

  //   const toS3Records: (notifications: any) => {
  //     Records: any;
  //   };

  //   const toSqsSnsS3Records: (notifications: any) => {
  //     Records: {
  //       body: string;
  //     }[];
  //   };

  //   const fromSns: (event: any) => Highland.Stream<{
  //     record: any;
  //   }>;

  //   const toSnsRecords: (messages: any) => {
  //     Records: any;
  //   };

  //   const sendToSqs: ({
  //     debug,
  //     queueUrl,
  //     messageField,
  //     batchSize,
  //     parallel,
  //     ...opt
  //   }?: {
  //     debug?: debug.Debugger | undefined;
  //     queueUrl?: string | undefined;
  //     messageField?: string | undefined;
  //     batchSize?: number | undefined;
  //     parallel?: number | undefined;
  //   }) => (s: any) => any;

  //   export function initialize(
  //     pipelines: any,
  //     opt?: {}
  //   ): {
  //     assemble: (
  //       head: any,
  //       includeFaultHandler?: boolean
  //     ) => Highland.Stream<any>;
  //   };

  //   export * from './batch';
  // export * from './claimcheck';
  // export * from './cloudwatch';
  // export * from './compression';
  // export * from './dynamodb';
  // export * from './encryption';
  // export * from './eventbridge';
  // export * from './faults';
  // export * from './fetch';
  // export * from './firehose';
  // export * from './handler';
  // export * from './kinesis';
  // export * from './lambda';
  // export * from './opt';
  // export * from './print';
  // export * from './ratelimit';
  // export * from './retry';
  // export * from './secretsmgr';
  // export * from './s3';
  // export * from './sns';
  // export * from './split';
  // export * from './sqs';
  // export * from './tags';
  // export * from './time';

  export function initializeFrom(rules: Rule[]): any;
}
