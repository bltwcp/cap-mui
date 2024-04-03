import opentelemetry, { } from '@opentelemetry/api'
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { BatchSpanProcessor, } from '@opentelemetry/sdk-trace-base'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { ZoneContextManager } from '@opentelemetry/context-zone'

const provider = new WebTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: process.env.REACT_APP_OTLP_SERVICE_NAME,
    })
})
const exporter = new OTLPTraceExporter({
    url: process.env.REACT_APP_OTLP_HTTP_COLLECTOR
})
provider.addSpanProcessor(new BatchSpanProcessor(exporter))
provider.register({
    contextManager: new ZoneContextManager(),
})

const tracer = opentelemetry.trace.getTracer('tracer')
export const StartSpan = (spanName: string, spanOption: any = undefined, currentSpan: any = undefined) => {
    if (currentSpan) {
        const currentCtx = opentelemetry.context.active()
        const ctx = opentelemetry.trace.setSpan(currentCtx, currentSpan)
        return tracer.startSpan(spanName, spanOption, ctx)
    }
    return tracer.startSpan(spanName, spanOption)
}

export const InjectHeader = (span: any, header: any = {}) => {
    if (span && span._spanContext)
        return {
            ...header,
            'traceparent': `00-${span._spanContext.traceId}-${span._spanContext.spanId}-${String(span._spanContext.traceFlags).padStart(2, '0')}`
        }
    return header
}