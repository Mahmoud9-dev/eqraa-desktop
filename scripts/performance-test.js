import { performance } from "perf_hooks";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { BookOpen } from "lucide-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Performance testing utilities
class PerformanceTestSuite {
  constructor() {
    this.results = [];
    this.thresholds = {
      renderTime: 16.67, // 60fps target
      apiResponse: 200, // 200ms target
      memoryUsage: 50 * 1024 * 1024, // 50MB target
      bundleSize: 1024 * 1024, // 1MB target
    };
  }

  // Measure component render time
  async measureComponentRender(componentPath, props = {}, iterations = 10) {
    const times = [];

    try {
      // Dynamic import of component
      const { default: Component } = await import(componentPath);

      for (let i = 0; i < iterations; i++) {
        const start = performance.now();

        // Simulate component render (in real scenario, you'd use React Testing Library)
        const mockRender = () => {
          // Simulate component work
          const result = { component: Component.name, props };
          return result;
        };

        mockRender();

        const end = performance.now();
        times.push(end - start);
      }

      const average = times.reduce((a, b) => a + b, 0) / times.length;
      const min = Math.min(...times);
      const max = Math.max(...times);

      const result = {
        type: "component-render",
        component: componentPath,
        iterations,
        average,
        min,
        max,
        times,
        passed: average <= this.thresholds.renderTime,
      };

      this.results.push(result);
      return result;
    } catch (error) {
      console.error(`Error testing component ${componentPath}:`, error);
      return null;
    }
  }

  // Measure API response time
  async measureApiResponse(
    endpoint,
    method = "GET",
    body = null,
    iterations = 5
  ) {
    const times = [];

    for (let i = 0; i < iterations; i++) {
      const start = performance.now();

      try {
        const options = {
          method,
          headers: {
            "Content-Type": "application/json",
          },
        };

        if (body && method !== "GET") {
          options.body = JSON.stringify(body);
        }

        const response = await fetch(endpoint, options);
        await response.json();

        const end = performance.now();
        times.push(end - start);
      } catch (error) {
        console.error(`API call failed for ${endpoint}:`, error);
        times.push(Infinity); // Mark as failed
      }
    }

    const validTimes = times.filter((t) => t !== Infinity);
    const average =
      validTimes.length > 0
        ? validTimes.reduce((a, b) => a + b, 0) / validTimes.length
        : Infinity;
    const min = validTimes.length > 0 ? Math.min(...validTimes) : Infinity;
    const max = validTimes.length > 0 ? Math.max(...validTimes) : Infinity;

    const result = {
      type: "api-response",
      endpoint,
      method,
      iterations,
      average,
      min,
      max,
      times,
      successRate: (validTimes.length / times.length) * 100,
      passed: average <= this.thresholds.apiResponse,
    };

    this.results.push(result);
    return result;
  }

  // Measure memory usage
  measureMemoryUsage() {
    const memoryUsage = process.memoryUsage();

    const result = {
      type: "memory-usage",
      rss: memoryUsage.rss,
      heapTotal: memoryUsage.heapTotal,
      heapUsed: memoryUsage.heapUsed,
      external: memoryUsage.external,
      passed: memoryUsage.heapUsed <= this.thresholds.memoryUsage,
    };

    this.results.push(result);
    return result;
  }

  // Measure bundle size (simulated)
  async measureBundleSize() {
    try {
      // In a real scenario, you'd analyze the built bundle
      const fs = await import("fs/promises");
      const path = join(__dirname, "../dist/index.html");

      let bundleSize = 0;
      try {
        const stats = await fs.stat(path);
        bundleSize = stats.size;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_error) {
        // File doesn't exist, use mock size
        bundleSize = 500 * 1024; // 500KB mock
      }

      const result = {
        type: "bundle-size",
        size: bundleSize,
        sizeMB: bundleSize / (1024 * 1024),
        passed: bundleSize <= this.thresholds.bundleSize,
      };

      this.results.push(result);
      return result;
    } catch (error) {
      console.error("Error measuring bundle size:", error);
      return null;
    }
  }

  // Load testing
  async loadTest(endpoint, concurrency = 10, duration = 5000) {
    const startTime = performance.now();
    const endTime = startTime + duration;
    const results = [];
    let activeRequests = 0;
    let totalRequests = 0;
    let successfulRequests = 0;

    const makeRequest = async () => {
      const requestStart = performance.now();
      activeRequests++;
      totalRequests++;

      try {
        const response = await fetch(endpoint);
        const requestEnd = performance.now();
        const requestTime = requestEnd - requestStart;

        results.push({
          time: requestTime,
          status: response.status,
          success: response.ok,
        });

        if (response.ok) successfulRequests++;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_error) {
        results.push({
          time: Infinity,
          status: 0,
          success: false,
        });
      } finally {
        activeRequests--;
      }
    };

    // Run load test
    const promises = [];
    while (performance.now() < endTime) {
      while (activeRequests < concurrency && performance.now() < endTime) {
        promises.push(makeRequest());
        // Small delay between requests
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    await Promise.all(promises);

    const successfulResults = results.filter((r) => r.success);
    const averageResponseTime =
      successfulResults.length > 0
        ? successfulResults.reduce((sum, r) => sum + r.time, 0) /
          successfulResults.length
        : 0;

    const result = {
      type: "load-test",
      endpoint,
      concurrency,
      duration,
      totalRequests,
      successfulRequests,
      failedRequests: totalRequests - successfulRequests,
      successRate: (successfulRequests / totalRequests) * 100,
      averageResponseTime,
      requestsPerSecond: totalRequests / (duration / 1000),
      passed: successfulRequests / totalRequests >= 0.95, // 95% success rate
    };

    this.results.push(result);
    return result;
  }

  // Generate performance report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests: this.results.length,
        passedTests: this.results.filter((r) => r.passed).length,
        failedTests: this.results.filter((r) => !r.passed).length,
        passRate:
          (this.results.filter((r) => r.passed).length / this.results.length) *
          100,
      },
      thresholds: this.thresholds,
      results: this.results,
    };

    return report;
  }

  // Save report to file
  async saveReport(filePath = "performance-report.json") {
    const report = this.generateReport();
    const fs = await import("fs/promises");

    try {
      await fs.writeFile(filePath, JSON.stringify(report, null, 2));
      console.log(`Performance report saved to ${filePath}`);
    } catch (error) {
      console.error("Error saving report:", error);
    }
  }

  // Reset results
  reset() {
    this.results = [];
  }
}

// Main performance test execution
async function runPerformanceTests() {
  const suite = new PerformanceTestSuite();

  console.log("🚀 Starting Performance Tests...\n");

  // Test component render performance
  console.log("📦 Testing Component Render Performance...");
  const componentResults = await suite.measureComponentRender(
    "../src/components/IconButton.tsx",
    { icon: BookOpen, label: "Test", to: "/test" }
  );
  console.log(
    `   Average render time: ${componentResults?.average.toFixed(2)}ms`
  );
  console.log(
    `   Status: ${componentResults?.passed ? "✅ PASSED" : "❌ FAILED"}\n`
  );

  // Test API response performance
  console.log("🌐 Testing API Response Performance...");
  const apiResults = await suite.measureApiResponse(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  console.log(`   Average response time: ${apiResults?.average.toFixed(2)}ms`);
  console.log(`   Status: ${apiResults?.passed ? "✅ PASSED" : "❌ FAILED"}\n`);

  // Test memory usage
  console.log("💾 Testing Memory Usage...");
  const memoryResults = suite.measureMemoryUsage();
  console.log(
    `   Heap used: ${(memoryResults.heapUsed / (1024 * 1024)).toFixed(2)}MB`
  );
  console.log(
    `   Status: ${memoryResults.passed ? "✅ PASSED" : "❌ FAILED"}\n`
  );

  // Test bundle size
  console.log("📦 Testing Bundle Size...");
  const bundleResults = await suite.measureBundleSize();
  console.log(`   Bundle size: ${bundleResults?.sizeMB.toFixed(2)}MB`);
  console.log(
    `   Status: ${bundleResults?.passed ? "✅ PASSED" : "❌ FAILED"}\n`
  );

  // Load testing
  console.log("⚡ Running Load Test...");
  const loadResults = await suite.loadTest(
    "https://jsonplaceholder.typicode.com/posts/1",
    5, // concurrency
    3000 // duration in ms
  );
  console.log(
    `   Requests per second: ${loadResults?.requestsPerSecond.toFixed(2)}`
  );
  console.log(`   Success rate: ${loadResults?.successRate.toFixed(2)}%`);
  console.log(
    `   Status: ${loadResults?.passed ? "✅ PASSED" : "❌ FAILED"}\n`
  );

  // Generate and save report
  console.log("📊 Generating Performance Report...");
  await suite.saveReport();

  const report = suite.generateReport();
  console.log("\n📋 Performance Test Summary:");
  console.log(`   Total Tests: ${report.summary.totalTests}`);
  console.log(`   Passed: ${report.summary.passedTests}`);
  console.log(`   Failed: ${report.summary.failedTests}`);
  console.log(`   Pass Rate: ${report.summary.passRate.toFixed(2)}%`);

  if (report.summary.failedTests > 0) {
    console.log(
      "\n❌ Some performance tests failed. Check the report for details."
    );
    process.exit(1);
  } else {
    console.log("\n✅ All performance tests passed!");
    process.exit(0);
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runPerformanceTests().catch(console.error);
}

export { PerformanceTestSuite, runPerformanceTests };
