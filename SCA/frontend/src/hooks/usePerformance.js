import { useEffect } from "react";

// Performance Monitoring Hook
export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Web Vitals monitoring
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === "measure") {
          console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
        }

        if (entry.entryType === "navigation") {
          const navEntry = entry;
          console.log("Navigation Performance:", {
            DNS: navEntry.domainLookupEnd - navEntry.domainLookupStart,
            TCP: navEntry.connectEnd - navEntry.connectStart,
            Request: navEntry.responseStart - navEntry.requestStart,
            Response: navEntry.responseEnd - navEntry.responseStart,
            DOM:
              navEntry.domContentLoadedEventEnd -
              navEntry.domContentLoadedEventStart,
            Load: navEntry.loadEventEnd - navEntry.loadEventStart,
          });
        }
      });
    });

    observer.observe({ entryTypes: ["measure", "navigation"] });

    // Core Web Vitals
    const vitalsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        switch (entry.entryType) {
          case "largest-contentful-paint":
            console.log("LCP:", entry.startTime);
            break;
          case "first-input":
            console.log("FID:", entry.processingStart - entry.startTime);
            break;
          case "layout-shift":
            if (!entry.hadRecentInput) {
              console.log("CLS:", entry.value);
            }
            break;
        }
      });
    });

    vitalsObserver.observe({
      entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"],
    });

    return () => {
      observer.disconnect();
      vitalsObserver.disconnect();
    };
  }, []);
};

// Memory Usage Monitor
export const useMemoryMonitor = () => {
  useEffect(() => {
    const checkMemory = () => {
      if ("memory" in performance) {
        const memInfo = performance.memory;
        console.log("Memory Usage:", {
          used: `${Math.round(memInfo.usedJSHeapSize / 1048576)}MB`,
          total: `${Math.round(memInfo.totalJSHeapSize / 1048576)}MB`,
          limit: `${Math.round(memInfo.jsHeapSizeLimit / 1048576)}MB`,
        });
      }
    };

    const interval = setInterval(checkMemory, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);
};

// Network Status Monitor
export const useNetworkMonitor = () => {
  useEffect(() => {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    if (connection) {
      const logConnectionInfo = () => {
        console.log("Network Info:", {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData,
        });
      };

      logConnectionInfo();
      connection.addEventListener("change", logConnectionInfo);

      return () => {
        connection.removeEventListener("change", logConnectionInfo);
      };
    }
  }, []);
};

// Bundle Size Analysis
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === "development") {
    const scripts = Array.from(document.querySelectorAll("script[src]"));
    const styles = Array.from(
      document.querySelectorAll('link[rel="stylesheet"]')
    );

    console.log("Bundle Analysis:", {
      scripts: scripts.length,
      styles: styles.length,
      scriptUrls: scripts.map((s) => s.src),
      styleUrls: styles.map((s) => s.href),
    });
  }
};
